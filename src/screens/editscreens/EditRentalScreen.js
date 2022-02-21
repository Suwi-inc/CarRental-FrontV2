import React, { useEffect, useState } from 'react';
import { Card } from 'react-native-elements';
import { CustomerDataProvider } from '../../services/dataproviders/CustomerDataProvider';
import { VehicleDataProvider } from '../../services/dataproviders/VehicleDataProvider';
import {  RentalDataProvider } from '../../services/dataproviders/RentalDataProvider';
import { View, Picker, Dimensions, } from 'react-native';
//import  Loading  from '../LoadingScreens/Loading'
import { ErrorMessage, Formik } from 'formik';
import {
  NativeBaseProvider,
  Text,
  Input,
  Button,
  Flex,
  Box,
} from 'native-base';
import { object, string, number } from 'yup';
import RentalScreen from '../mainscreens/RentalScreen';

const ErrorComponent = (msg) => (
  <Text color="red.700" fontSize="md">
    {msg}
  </Text>
);
     
                          
const validationSchema = object().shape({
    price: string().required(ErrorComponent('Поле не может быть пустым')),
    startDate: string().required(ErrorComponent('Поле не может быть пустым')),
    endDate: string().required(ErrorComponent('Поле не может быть пустым')),
    vehicle: string().required(ErrorComponent('Поле не может быть пустым')),
    customer: string().required(ErrorComponent('Поле не может быть пустым')),
});

const EditRentalScreen = ({ route, navigation }) => {
  const id = route?.params?.id ?? -1;
  const [defaultValues, setDefaultValues] = useState({
    id,
    price: "",
    startDate: "",
    endDate: "",
    vehicle: 1,
    customer: 1
  });


 // const [isLoading, setIsLoading] = useState()
  const [vehicles, setVehicles] = useState()
  const [customers, setCustomers] = useState()


  useEffect(() => {
    if (id !== -1) {
        RentalDataProvider.getRentalByID(id).then((data) => {
        setDefaultValues({
          ...data.data,
          vehicle: data.data.vehicle.id,
          customer: data.data.customer.id
        });
      });
    }
    
    let count = 0;

    CustomerDataProvider.getAllCustomersShortInfo().then((customers) => {
      const mappedCustomers = customers.data.map((customer) => ({
        key: customer.id,
        ...customer,
      }));

      setCustomers(mappedCustomers);
      count++
     //setIsLoading(count)
    });


    VehicleDataProvider.getAllVehiclesShortInfo().then((vehicles) => {
      const mappedVehicles = vehicles.data.map((vehicle) => ({
        key: vehicle.id,
        ...vehicle,
      }));

      setVehicles(mappedVehicles);
      count++
     // setIsLoading(count)
    });
  }, []);

  const handleSubmit = async (values) => {
    if (id === -1) {
      values = {
        price: values.price,
        startDate: values.startDate,
        endDate: values.endDate,
        vehicleid: values.vehicle,
        customerid: values.customer
      }
      RentalDataProvider.putRental(values).then( () => {
        route.params.refresh();
        navigation.goBack();
      });;
    } else {
      values = {
        ...values,
        vehicle: await (await VehicleDataProvider.getVehicleByID(values.vehicle)).data,
        customer: await (await CustomerDataProvider.getCustomerByID(values.customer)).data,
      }
      RentalDataProvider.updateRental(values).then( () => {
        route.params.refresh();
        navigation.goBack();
      });;
    }
  };

  if (3<1) return <RentalScreen />;

  return (
    <Card>
      <Card.Title>{id === -1 ? 'Добавление' : 'Редактирование'}</Card.Title>
      <Card.Divider />
      <View style={{ height: 600 }}>
        <Formik
          initialValues={defaultValues}
          enableReinitialize={true}
          onSubmit={handleSubmit}
          validationSchema={validationSchema}
        >
          {(props) => {
            return (
              <NativeBaseProvider>
                <Flex>
                  <Box>
                    <Text fontSize="md">Rental price:</Text>
                    <Input
                      onChangeText={props.handleChange('price')}
                      onBlur={props.handleBlur('price')}
                      value={props.values.price.toString()}
                      placeholder="enter rental price"
                      variant="underlined"
                      mt={5}
                    />
                    <ErrorMessage name="price" />
                  </Box>
                  <Box>
                    <Text fontSize="md">start date:</Text>
                    <Input
                      onChangeText={props.handleChange('startDate')}
                      onBlur={props.handleBlur('startDate')}
                      value={props.values.startDate.toString()}
                      placeholder="enter start date"
                      variant="underlined"
                      mt={5}
                    />
                    <ErrorMessage name="startDate" />
                  </Box>
                  <Box>
                    <Text fontSize="md">end date:</Text>
                    <Input
                      onChangeText={props.handleChange('endDate')}
                      onBlur={props.handleBlur('endDate')}
                      value={props.values.endDate.toString()}
                      placeholder="enter end date"
                      variant="underlined"
                      mt={5}
                    />
                    <ErrorMessage name="endDate" />
                  </Box>
                  <Box>
                    <Text fontSize="md">vehicle:</Text>
                    <Picker
                      selectedValue={props.values.vehicle}
                      style={{ height: 30, width: Dimensions.get('window').width * 0.8 }}
                      onValueChange={props.handleChange('vehicle')}
                    >
                      {
                        vehicles.map((vehicle) => (
                            <Picker.Item key={vehicle.key} label={vehicle.carName} value={vehicle.id} />
                        ))
                      }
                    </Picker>
                    <ErrorMessage name="vehicle" />
                  </Box>
                  <Box>
                    <Text fontSize="md">Customer:</Text>
                    <Picker
                      selectedValue={props.values.customer}
                      style={{ height: 30, width: Dimensions.get('window').width * 0.8 }}
                      onValueChange={props.handleChange('customer')}
                    >
                      {
                        customers.map((customer) => (
                            <Picker.Item key={customer.key} label={customer.fullName} value={customer.id} />
                        ))
                      }
                    </Picker>
                    <ErrorMessage name="customer" />
                  </Box>
                  <Button
                    size="sm"
                    fontSize="md"
                    variant="outline"
                    colorScheme="coolGray"
                    h={{
                      md: '10',
                    }}
                    mt={6}
                    onPress={props.handleSubmit}
                  >
                    Сохранить
                  </Button>
                </Flex>
              </NativeBaseProvider>
            );
          }}
        </Formik>
      </View>
    </Card>
  );
};

export default EditRentalScreen;
