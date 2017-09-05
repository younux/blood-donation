/**
 * Profile object.
 */

import {Address} from './address.model';


export class Profile {

  id: number;
  username: string;
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  address: Address;
  birthDate: Date;
  bloodType: string;
  emailNotification: boolean;
  sms_notification: boolean;

  constructor(  id: number,
                username: string,
                email: string,
                password: string,
                firstName: string,
                lastName: string,
                phoneNumber: string,
                address: Address,
                birthDate: Date,
                bloodType: string,
                emailNotification: boolean,
                sms_notification: boolean) {
      this.id = id;
      this.username = username;
      this.email = email;
      this.password = password;
      this.firstName = firstName;
      this.lastName = lastName;
      this.phoneNumber = phoneNumber;
      this.address = address;
      this.birthDate = birthDate;
      this.bloodType = bloodType;
      this.emailNotification = emailNotification;
      this.sms_notification = sms_notification;
  }


}
