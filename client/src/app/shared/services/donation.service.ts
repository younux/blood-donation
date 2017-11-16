import {Inject, Injectable} from '@angular/core';
import {Http, Response, RequestOptions, Headers} from "@angular/http";
import {Observable} from "rxjs/Observable";
import {Donation} from '../models/donation.model';
import {MyHttpService} from "./my-http.service";
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';


@Injectable()
export class DonationService  {

  constructor(private http: MyHttpService,
              @Inject('APP_API_URL') private apiUrl: string,
              ) {

  }

  createDonation(deadline: string,
                 description: string,
                 city: string,
                 phoneNumber: string,
                 status: string) {

    const queryUrl = `${this.apiUrl}donations/create/`;
    let data = {deadline: deadline, description: description, city: city, phoneNumber: phoneNumber, status: status};
    return this.http.post(queryUrl, JSON.stringify(data))
      .map(response => response.json())
      .catch(this.handle_error);

  }

  listDonations(queryParamsStr?: string) {
    let queryUrl = `${this.apiUrl}donations/`;
    if(queryParamsStr){
      queryUrl = `${queryUrl}?${queryParamsStr}`;
    }
    return this.http.get(queryUrl)
      .map(response => {
        return response.json();
      })
      .catch(this.handle_error);

  }

  getDonation(id: number) {
    const queryUrl = `${this.apiUrl}donations/${id}/`;
    return this.http.get(queryUrl)
      .map(response => {
        return response.json();
      })
      .catch(this.handle_error);
  }

  updateDonation( id: number,
                  deadline: string,
                  description: string,
                  city: string,
                  phoneNumber: string,
                  status: string) {
    const queryUrl = `${this.apiUrl}donations/${id}/`;
    let data = {deadline: deadline, description: description, city: city, phoneNumber: phoneNumber, status: status};
    return this.http.put(queryUrl, JSON.stringify(data))
      .map(response => response.json())
      .catch(this.handle_error);
  }

  deleteDonation(id: number) {
    const queryUrl = `${this.apiUrl}donations/${id}/`;
    return this.http.delete(queryUrl)
      .map(response => response.json())
      .catch(this.handle_error);
  }

  countDonationsByBloodType(queryParamsStr?: string) {
    let queryUrl = `${this.apiUrl}donations/count/`;
    if(queryParamsStr){
      queryUrl = `${queryUrl}?${queryParamsStr}`;
    }
    return this.http.get(queryUrl)
      .map(response => {
        return response.json();
      })
      .catch(this.handle_error);
  }

  private handle_error(error: any): any {
    return Observable.throw(error.json());
  }



}
