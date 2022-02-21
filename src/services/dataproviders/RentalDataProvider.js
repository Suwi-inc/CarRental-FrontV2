import axios from "axios";

export class RentalDataProvider {
  static mainURL = "https://finalcarapp.herokuapp.com"
  static rentalsURL = this.mainURL + "/rentals"

  static getAllRentalsShortInfo = () => 
    axios.get(this.rentalsURL)
  
  static getRentalByID = (id) =>
    axios.get(this.rentalsURL + `/${id}`)

  // Обновить существующего
  static updateRental = (newRentalData) =>
    axios.put(this.rentalsURL, newRentalData)

  // Добавить нового
  static putRental = (newRental) =>
    axios.post(this.rentalsURL, newRental)

  // Удалить 
  static deleteRental = (id) =>
    axios.delete(this.rentalsURL + `/${id}`)


/*import { Rentals } from '../data/Rentals';


export class RentalDataProvider {
  static rentals = Rentals();

  static findRentalByIdPredicate = (rental, id) => rental.id === id;

  static getRentalsShortInfo = () =>
    Promise.resolve(
      this.rentals.map((rental) => ({ id: rental.id, price: rental.price }))
    );

  static getRentalByID = (id) =>
    new Promise((resolve, reject) => {
      const result = this.rentals.find((rental) =>
        this.findRentalByIdPredicate(rental, id)
      );

      if (!result) {
        reject(`rental with id ${id} not found`);
      }

      resolve(result);
    });


  // update vehicle
  static updateRental = (newRentalData) => {
    return new Promise((resolve, reject) => {
      const RentalIndex = this.rentals.findIndex((rental) =>
        this.findRentalByIdPredicate(rental, newRentalData.id)
      );

      if (RentalIndex < 0) {
        reject(`rental with  id ${id} not found`);
      }

      this.rentals[RentalIndex] = newRentalData;
      resolve(RentalIndex);
    });
  };

  // add new customer
  static putRental = (newRental) => {
    const newRentalIndex = this.rentals.push({
      ...newRental,
      id: +Date(),
    });

    return Promise.resolve(newRentalIndex);
  };

  static deleteRental = (id) => {
    return new Promise((resolve, reject) => {
      const index = this.rentals.findIndex((rental) =>
        this.findRentalByIdPredicate(rental, id)
      );

      if (index < 0) {
        reject(`rental with id ${id} not found`);
      }

      this.rentals.splice(index, 1);
      resolve(this.rentals.length);
    });
  };
}*/
}

