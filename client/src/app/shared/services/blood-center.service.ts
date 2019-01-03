import {Inject, Injectable} from '@angular/core';
import {MyHttpService} from "./my-http.service";
import {Address} from "../models/address.model";
import {Observable} from "rxjs/Observable";

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';


@Injectable()
export class BloodCenterService {

  constructor(private http: MyHttpService,
              @Inject('APP_API_URL')  private apiUrl: string) {

  }

  createBloodCenter(name: string,
                    address: Address,
                    latitude: number,
                    longitude: number){
    const queryUrl = `${this.apiUrl}blood-centers/create/`;
    const data = {name: name, address: address, latitude: latitude, longitude: longitude};
    return this.http.post(queryUrl, JSON.stringify(data))
      .map(response => response.json())
      .catch(this.handle_error);
  }

  listBloodCenters(queryParams?: any) {
    let queryUrl = `${this.apiUrl}blood-centers/`;
    if(queryParams){
      let sentQueryParamsArray = [];
      if (queryParams['page']) {
        sentQueryParamsArray.push(`page=${queryParams['page']}`);
      }
      if (queryParams['name']) {
        sentQueryParamsArray.push(`name=${queryParams['name']}`);
      }
      if (queryParams['city']) {
        sentQueryParamsArray.push(`city=${queryParams['city']}`);
      }
      if (queryParams['country']) {
        sentQueryParamsArray.push(`country=${queryParams['country']}`);
      }
      if (queryParams['zipCode']) {
        sentQueryParamsArray.push(`zipCode=${queryParams['zipCode']}`);
      }
      if(queryParams['noPage']){
        sentQueryParamsArray.push(`noPage=${queryParams['noPage']}`);
      }
      if(queryParams['minLat']){
        sentQueryParamsArray.push(`minLat=${queryParams['minLat']}`);
      }
      if(queryParams['maxLat']){
        sentQueryParamsArray.push(`maxLat=${queryParams['maxLat']}`);
      }
      if(queryParams['minLng']){
        sentQueryParamsArray.push(`minLng=${queryParams['minLng']}`);
      }
      if(queryParams['maxLng']){
        sentQueryParamsArray.push(`maxLng=${queryParams['maxLng']}`);
      }
      queryUrl = `${queryUrl}?${sentQueryParamsArray.join('&')}`;
    }
    return this.http.get(queryUrl)
      .map(response => response.json())
      .catch(this.handle_error);
  }

  getBloodCenter(id: number) {
    const queryUrl = `${this.apiUrl}blood-centers/${id}/`;
    return this.http.get(queryUrl)
      .map(response => response.json())
      .catch(this.handle_error);
  }

  updateBloodCenter(id: number,
                    name: string,
                    address: Address,
                    latitude: number,
                    longitude: number) {
    const queryUrl = `${this.apiUrl}blood-centers/${id}/`;
    const data = {name: name, address: address, latitude: latitude, longitude: longitude};
    return this.http.put(queryUrl, JSON.stringify(data))
      .map(response => response.json())
      .catch(this.handle_error);
  }

  deleteBloodCenter(id: number) {
    const queryUrl = `${this.apiUrl}blood-centers/${id}/`;
    return this.http.delete(queryUrl)
      .map(response => response.json())
      .catch(this.handle_error);
  }

  private handle_error(error: any): any {
    return Observable.throw(error.json());
  }

}
