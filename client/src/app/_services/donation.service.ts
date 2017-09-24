import {Inject, Injectable} from '@angular/core';
import {Http, Response, RequestOptions, Headers} from "@angular/http";
import {Observable} from "rxjs/Observable";
import {Donation} from "../_models/donation.model";
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import {MyHttpService} from "./my-http.service";

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

  listDonations(applicantUsername?: string,
                bloodType?: string,
                city?: string,
                status?: string) {
    let queryUrl = `${this.apiUrl}donations/`;
    if (applicantUsername || bloodType || city || status){
      let queryParams : string[];
      if (applicantUsername) {queryParams.push(`applicantUsername=${applicantUsername}`); }
      if (bloodType) {queryParams.push(`bloodType=${bloodType}`); }
      if (city) {queryParams.push(`city=${city}`); }
      if (status) {queryParams.push(`status=${status}`); }
      queryUrl = `${queryUrl}?${queryParams.join('&')}`;
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


  private handle_error(error: any): any {
    return Observable.throw(error.json());
  }

}
