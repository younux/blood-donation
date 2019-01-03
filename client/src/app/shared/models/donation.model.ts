/**
 * Donation object.
 */

import {Address} from './address.model';
import {Profile} from './profile.model';


export class Donation {

  id: number;
  url: string;
  createdOn: string;
  applicant: Profile;
  bloodType: string;
  deadline: string;
  description: string;
  city: string;
  country: string;
  phoneNumber: string;
  status: string;

  constructor(  id: number,
                createdOn: string,
                applicant: Profile,
                bloodType: string,
                deadline: string,
                description: string,
                city: string,
                country: string,
                phoneNumber: string,
                status: string) {
    this.id = id;
    this.createdOn = createdOn;
    this.applicant = applicant;
    this.bloodType = bloodType;
    this.deadline = deadline;
    this.description = description;
    this.city = city;
    this.country = country;
    this.phoneNumber = phoneNumber;
    this.status = status;
  }


}
