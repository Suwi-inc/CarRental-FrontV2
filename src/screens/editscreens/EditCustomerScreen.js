import React, { useEffect, useState } from 'react';
import { Card } from 'react-native-elements';
import {  CustomerDataProvider } from '../../services/dataproviders/CustomerDataProvider';
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


const validationSchema = object().shape({
    fullName: string().required(ErrorComponent('Поле не может быть пустым')),
    address: string().required(ErrorComponent('Поле не может быть пустым')),
  phoneNumber: string().required(ErrorComponent('Поле не может быть пустым')),
});

const EditCustomerScreen = ({ route, navigation }) => {
  const id = route?.params?.id ?? -1;
  const [defaultValues, setDefaultValues] = useState({
    id,
    fullName: '',
    address: '',
    phoneNumber: '',
  });

  useEffect(() => {
    if (id !== -1) {
      CustomerDataProvider.getCustomerByID(id).then((data) => {
        setDefaultValues(data.data);
      });
    }
  }, []);

  const handleSubmit = (values) => {
    if (id === -1) {
      CustomerDataProvider.putCustomer(values).then( () => {
        route.params.refresh();
        navigation.goBack();
      });
    } else {
      CustomerDataProvider.updateCustomer(values).then( () => {
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
                    <Text fontSize="md">ФИО Клиет:</Text>
                    <Input
                      onChangeText={props.handleChange('fullName')}
                      onBlur={props.handleBlur('fullName')}
                      value={props.values.fullName}
                      placeholder="Введите ФИО Клиет"
                      variant="underlined"
                      mt={5}
                    />
                    <ErrorMessage name="fullName" />
                  </Box>
                  <Box>
                    <Text fontSize="md">адрес Клиет:</Text>
                    <Input
                      onChangeText={props.handleChange('address')}
                      onBlur={props.handleBlur('address')}
                      value={props.values.address}
                      placeholder="Введите адрес Клиет'"
                      variant="underlined"
                      mt={5}
                    />
                    <ErrorMessage name="address" />
                  </Box>
                  <Box>
                    <Text fontSize="md">Номер Телефона:</Text>
                    <Input
                      onChangeText={props.handleChange('phoneNumber')}
                      onBlur={props.handleBlur('phoneNumber')}
                      value={props.values.phoneNumber.toString()}
                      placeholder="Введите Номер Телефона"
                      variant="underlined"
                      mt={5}
                    />
                    <ErrorMessage name="phoneNumber" />
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

export default EditCustomerScreen;
