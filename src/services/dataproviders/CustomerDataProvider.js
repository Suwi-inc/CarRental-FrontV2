
import axios from "axios";

export class CustomerDataProvider {
  static mainURL = "https://finalcarapp.herokuapp.com"
  static customersURL = this.mainURL + "/customers"

  static getAllCustomersShortInfo = () => 
    axios.get(this.customersURL)
  
  static getCustomerByID = (id) =>
    axios.get(this.customersURL + `/${id}`)

  // Обновить существующего
  static updateCustomer = (newCustomerData) =>
    axios.put(this.customersURL, newCustomerData)

  // Добавить нового
  static putCustomer = (newCustomer) =>
    axios.post(this.customersURL, newCustomer)

  // Удалить 
  static deleteCustomer = (id) =>
    axios.delete(this.customersURL + `/${id}`)


/*import { Customers } from '../data/Customers';


export class CustomerDataProvider {
  static customers = Customers();

  static findCustomerByIdPredicate = (customer, id) => customer.id === id;

  static getAllCustomersShortInfo = () =>
    Promise.resolve(
      this.customers.map((customer) => ({ id: customer.id, fullName: customer.fullName }))
    );

  static getCustomerByID = (id) =>
    new Promise((resolve, reject) => {
      const result = this.customers.find((customer) =>
        this.findCustomerByIdPredicate(customer, id)
      );

      if (!result) {
        reject(`customer with id ${id} not found`);
      }

      resolve(result);
    });


  // update customer
  static updateCustomer = (newCustomerData) => {
    return new Promise((resolve, reject) => {
      const CustomerIndex = this.customers.findIndex((customer) =>
        this.findCustomerByIdPredicate(customer, newCustomerData.id)
      );

      if (bookIndex < 0) {
        reject(`customer with id ${id} not found`);
      }

      this.customers[CustomerIndex] = newCustomerData;
      resolve(CustomerIndex);
    });
  };

  // add new customer
  static putCustomer = (newCustomer) => {
    const newCustomerIndex = this.customers.push({
      ...newCustomer,
      id: +Date(),
    });

    return Promise.resolve(newCustomerIndex);
  };

  static deleteCustomer = (id) => {
    return new Promise((resolve, reject) => {
      const index = this.customers.findIndex((customer) =>
        this.findCustomerByIdPredicate(customer, id)
      );

      if (index < 0) {
        reject(`customer with id ${id} not found`);
      }

      this.customers.splice(index, 1);
      resolve(this.customers.length);
    });
  };
} */

}