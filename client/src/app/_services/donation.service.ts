import {Inject, Injectable} from '@angular/core';
import {Http, Response, RequestOptions, Headers} from "@angular/http";
import {Observable} from "rxjs/Observable";
import {Donation} from "../_models/donation.model";
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import DateTimeFormat = Intl.DateTimeFormat;

@Injectable()
export class DonationService  {

  constructor(private http: Http,
              @Inject('APP_API_URL') private apiKey: string,
              ) {

  }

  createDonation(deadline: DateTimeFormat,
                 description: string,
                 city: string,
                 phoneNumber: string,
                 status: string) {

    const queryUrl = `${this.apiKey}donations/create/`;
    let data = {deadline: deadline, description: description, city: city, phoneNumber: phoneNumber, status: status};
    let header = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: header });
    return this.http.post(queryUrl, JSON.stringify(data), options)
      .map(response => response.json())
      .catch(this.handle_error);

  }

  listDonations() {
    const queryUrl = `${this.apiKey}donations/`;
    return this.http.get(queryUrl)
      .map(response => {
        return response.json();
      })
      .catch(this.handle_error);

  }

  getDonation(id: number) {
    const queryUrl = `${this.apiKey}donations/${id}/`;
    return this.http.get(queryUrl)
      .map(response => {
        return response.json();
      })
      .catch(this.handle_error);
  }

  updateDonation( id: number,
                  deadline: DateTimeFormat,
                  description: string,
                  city: string,
                  phoneNumber: string,
                  status: string)  {
    const queryUrl = `${this.apiKey}donations/${id}/`;
    let data = {deadline: deadline, description: description, city: city, phoneNumber: phoneNumber, status: status};
    let header = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: header });
    return this.http.put(queryUrl, JSON.stringify(data), options)
      .map(response => response.json())
      .catch(this.handle_error);

  }

  deleteDonation(id: number) {
    const queryUrl = `${this.apiKey}donations/${id}/`;
    return this.http.delete(queryUrl)
      .map(response => response.json())
      .catch(this.handle_error);
  }


  private handle_error(error: any , caught: any): any {
    console.log(error, caught);
  }

}
