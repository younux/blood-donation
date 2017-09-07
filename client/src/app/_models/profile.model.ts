/**
 * Profile object.
 */

import {Address} from './address.model';


export class Profile {

  username: string;
  email: string;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  address: Address;
  birthDate: Date;
  bloodType: string;
  emailNotification: boolean;
  smsNotification: boolean;

  constructor(  username: string,
                email: string,
                firstName: string,
                lastName: string,
                phoneNumber: string,
                address: Address,
                birthDate: Date,
                bloodType: string,
                emailNotification: boolean,
                smsNotification: boolean) {
      this.username = username;
      this.email = email;
      this.firstName = firstName;
      this.lastName = lastName;
      this.phoneNumber = phoneNumber;
      this.address = address;
      this.birthDate = birthDate;
      this.bloodType = bloodType;
      this.emailNotification = emailNotification;
      this.smsNotification = smsNotification;
  }


}
