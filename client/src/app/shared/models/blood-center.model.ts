import {Address} from './address.model';

export class BloodCenter {

  id: number;
  name: string;
  address: Address;
  latitude: number;
  longitude: number;

  constructor(id: number, name: string, address: Address, latitude: number, longitude: number){
    this.id = id;
    this.name = name;
    this.address = address;
    this.latitude = latitude;
    this.longitude = longitude;
  }

}
