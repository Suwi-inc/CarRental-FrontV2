import React, { useEffect, useState } from 'react';
import { Card } from 'react-native-elements';
import { VehicleDataProvider } from '../../services/dataproviders/VehicleDataProvider';
import { View } from 'react-native';
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
const ErrorComponent = (msg) => (
  <Text color="red.700" fontSize="md">
    {msg}
  </Text>
);
//problem with adding rental and displaying items due to incorrect serialization

const validationSchema = object().shape({
    carName: string().required(ErrorComponent('Поле не может быть пустым')),
    model: string().required(ErrorComponent('Поле не может быть пустым')),
    registration: string().required(ErrorComponent('Поле не может быть пустым')),
    colour: string().required(ErrorComponent('Поле не может быть пустым')),
});

const EditVehicleScreen = ({ route, navigation }) => {
  const id = route?.params?.id ?? -1;
  const [defaultValues, setDefaultValues] = useState({
    id,
    carName: '',
    model: '',
    registration: '',
    colour: '',
  });

  useEffect(() => {
    if (id !== -1) {
      VehicleDataProvider.getVehicleByID(id).then((data) => {
        setDefaultValues(data.data);
      });
    }
  }, []);

  const handleSubmit = (values) => {
    if (id === -1) {
      VehicleDataProvider.putVehicle(values).then( () => {
        route.params.refresh();
        navigation.goBack();
      });
    } else {
      VehicleDataProvider.updateVehicle(values).then( () => {
        route.params.refresh();
        navigation.goBack();
      });
    }
    
  };

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
                    <Text fontSize="md">car name:</Text>
                    <Input
                      onChangeText={props.handleChange('carName')}
                      onBlur={props.handleBlur('carName')}
                      value={props.values.carName}
                      placeholder="enter car name"
                      variant="underlined"
                      mt={5}
                    />
                    <ErrorMessage name="carName" />
                  </Box>
                  <Box>
                    <Text fontSize="md">car model:</Text>
                    <Input
                      onChangeText={props.handleChange('model')}
                      onBlur={props.handleBlur('model')}
                      value={props.values.model}
                      placeholder="enter car model"
                      variant="underlined"
                      mt={5}
                    />
                    <ErrorMessage name="model" />
                  </Box>
                  <Box>
                    <Text fontSize="md">car registration:</Text>
                    <Input
                      onChangeText={props.handleChange('registration')}
                      onBlur={props.handleBlur('registration')}
                      value={props.values.registration}
                      placeholder="enter car registration"
                      variant="underlined"
                      mt={5}
                    />
                    <ErrorMessage name="registration" />
                  </Box>
                  <Box>
                    <Text fontSize="md">car colour:</Text>
                    <Input
                      onChangeText={props.handleChange('colour')}
                      onBlur={props.handleBlur('colour')}
                      value={props.values.colour}
                      placeholder="enter car colour"
                      variant="underlined"
                      mt={5}
                    />
                    <ErrorMessage name="colour" />
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

export default EditVehicleScreen;
