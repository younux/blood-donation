/**
 * Address object
 */

export class Address {

  street: string;
  city: string;
  country: string;
  zipCode: string;

  constructor(street: string, city: string, country: string, zipCode:  string) {
    this.street = street;
    this.city = city;
    this.country = country;
    this.zipCode = zipCode;
  }


}
