import axios from "axios";

export class VehicleDataProvider {
  static mainURL = "https://finalcarapp.herokuapp.com"
  static vehiclesURL = this.mainURL + "/vehicles"

  static getAllVehiclesShortInfo = () => 
    axios.get(this.vehiclesURL)
  
  static getVehicleByID = (id) =>
    axios.get(this.vehiclesURL + `/${id}`)

  // Обновить существующего
  static updateVehicle = (newVehicleData) =>
    axios.put(this.vehiclesURL, newVehicleData)

  // Добавить нового
  static putVehicle = (newVehicle) =>
    axios.post(this.vehiclesURL, newVehicle)

  // Удалить 
  static deleteVehicle = (id) =>
    axios.delete(this.vehiclesURL + `/${id}`)



/*import { Vehicles } from '../data/Vehicles';


export class VehicleDataProvider {
  static vehicles = Vehicles();

  static findVehicleByIdPredicate = (vehicle, id) => vehicle.id === id;

  static getAllVehiclesShortInfo = () =>
    Promise.resolve(
      this.vehicles.map((vehicle) => ({ id: vehicle.id, carName: vehicle.carName }))
    );

  static getVehicleByID = (id) =>
    new Promise((resolve, reject) => {
      const result = this.vehicles.find((vehicle) =>
        this.findVehicleByIdPredicate(vehicle, id)
      );

      if (!result) {
        reject(`vehicle with id ${id} not found`);
      }

      resolve(result);
    });


  // update vehicle
  static updateVehicle = (newVehicleData) => {
    return new Promise((resolve, reject) => {
      const VehicleIndex = this.vehicles.findIndex((vehicle) =>
        this.findVehicleByIdPredicate(vehicle, newVehicleData.id)
      );

      if (VehicleIndex < 0) {
        reject(`vehicle with  id ${id} not found`);
      }

      this.vehicles[VehicleIndex] = newVehicleData;
      resolve(VehicleIndex);
    });
  };

  // add new customer
  static putVehicle = (newVehicle) => {
    const newVehicleIndex = this.vehicles.push({
      ...newVehicle,
      id: +Date(),
    });

    return Promise.resolve(newVehicleIndex);
  };

  static deleteVehicle = (id) => {
    return new Promise((resolve, reject) => {
      const index = this.vehicles.findIndex((vehicle) =>
        this.findVehicleByIdPredicate(vehicle, id)
      );

      if (index < 0) {
        reject(`vehicle with id ${id} not found`);
      }

      this.vehicles.splice(index, 1);
      resolve(this.vehicles.length);
    });
  };
}*/
}


