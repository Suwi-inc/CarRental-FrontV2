/*import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';

export default function App() {
  return (
    <View style={styles.container}>
      <Text>Open up App.js to start working on your app!</Text>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffc71e',
    alignItems: 'center',
    justifyContent: 'center',
  },
}); */


import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import CustomerScreen from './src/screens/mainscreens/CustomerScreen'
import RentalScreen from './src/screens/mainscreens/RentalScreen'
import VehicleScreen from './src/screens/mainscreens/VehicleScreen'
import MainScreen from './src/screens/mainscreens/MainScreen';
import EditCustomerScreen from './src/screens/editscreens/EditCustomerScreen';
import EditRentalScreen from './src/screens/editscreens/EditRentalScreen'
import EditVehicleScreen from './src/screens/editscreens/EditVehicleScreen'

const Stack = createNativeStackNavigator();

// В корне храним только Навигацию
export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        
        <Stack.Screen name={'MainScreen'} component={MainScreen} />

        <Stack.Screen name={'CustomerScreen'} component={CustomerScreen} />
        <Stack.Screen name={'EditCustomerScreen'} component={EditCustomerScreen} />

        <Stack.Screen name={'RentalScreen'} component={RentalScreen} />
        <Stack.Screen name={'EditRentalScreen'} component={EditRentalScreen} />

        <Stack.Screen name={'VehicleScreen'} component={VehicleScreen} />
        <Stack.Screen name={'EditVehicleScreen'} component={EditVehicleScreen} />

      </Stack.Navigator>
    </NavigationContainer>
  );
}

