import React, { useEffect, useState } from 'react';
import {
  FlatList,
  TouchableHighlight,
  StyleSheet,
  View,
  Text,
} from 'react-native';
import { Card, ButtonGroup, Button, Icon } from 'react-native-elements';
import {  RentalDataProvider } from '../../services/dataproviders/RentalDataProvider';

const buttons = ['Удалить', 'Добавить'];

const RentalScreen = ({ navigation }) => {
  const [rentals, setRental] = useState();
  const [workMode, setWorkMode] = useState(1);

  const getData = () => {
    let shouldComponentsUpdate = true;

    RentalDataProvider.getAllRentalsShortInfo().then((rentals) => {
      const mappedRentals = rentals.data.map((rental) => ({
        key: rental.id,
        ...rental,
      }));

      if (shouldComponentsUpdate) {
        setRental(mappedRentals);
      }
    });

    return () => {
      shouldComponentsUpdate = false;
    };
  }

  useEffect(getData, []);

  const handleDelete = (id) => {
    RentalDataProvider.deleteRental(id).then( getData );
  };

  const renderListItem = ({ item }) => {
    return (
      <TouchableHighlight
        activeOpacity={0.6}
        underlayColor="#D9D9D9"
        onPress={
          workMode
            ? () =>
                navigation.navigate('EditRentalScreen', {
                  id: item.id,
                  refresh: getData
                })
            : () => {
                handleDelete(item.id);
              }
        }
      >
        <View style={styles.textContainer}>
          <Text style={styles.text}>{item.price}</Text>
          {!workMode && (
            <Button
              type="clear"
              onPress={
                workMode
                  ? () => null
                  : () => {
                      handleDelete(item.id);
                    }
              }
              icon={<Icon name="close" type="evilicon" color="#f00" />}
            />
          )}
        </View>
      </TouchableHighlight>
    );
  };

  const handleWorkModeChange = (pressedButtonIndex) => {
    if (pressedButtonIndex === 0) {
      if (workMode === 0) {
        setWorkMode(1);
      } else {
        setWorkMode(0);
      }
    } else {
      navigation.navigate('EditRentalScreen', {
        refresh: getData
      });
    }
  };

  return (
    <Card>
      <ButtonGroup
        buttons={buttons}
        containerStyle={{ height: 50 }}
        selectedIndex={workMode ? undefined : workMode}
        selectedButtonStyle={{ backgroundColor: '#f00' }}
        onPress={handleWorkModeChange}
      />
      <Card.Divider />
      <FlatList style={styles.list} data={rentals} renderItem={renderListItem} />
    </Card>
  );
};

export default RentalScreen;

const styles = StyleSheet.create({
  list: {
    marginBottom: 150,
  },
  textContainer: {
    borderColor: '#D3D3D3',
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    marginVertical: 5,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    minHeight: 60,
  },
  text: {
    fontSize: 25,
    maxWidth: 250,
    flexWrap: 'wrap',
    flexDirection: 'row',
  },
});
