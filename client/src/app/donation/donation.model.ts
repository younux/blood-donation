/**
 * Donation object.
 */

import DateTimeFormat = Intl.DateTimeFormat;
import {Address} from '../profile/address.model';
import {Profile} from '../profile/profile.model';


export class Donation {

  id: number;
  createdOn: DateTimeFormat;
  applicant: Profile;
  deadline: DateTimeFormat;
  description: string;
  city: string;
  phoneNumber: string;
  status: string;

  constructor(  id: number,
                createdOn: DateTimeFormat,
                applicant: Profile,
                deadline: DateTimeFormat,
                description: string,
                city: string,
                phoneNumber: string,
                status: string) {
    this.id = id;
    this.createdOn = createdOn,
    this.applicant = applicant,
    this.deadline = deadline,
    this.description = description,
    this.city = city,
    this.phoneNumber = phoneNumber,
    this.status = status
  }


}
