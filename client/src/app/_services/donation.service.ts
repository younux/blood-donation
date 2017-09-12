import {Inject, Injectable} from '@angular/core';
import {Http, Response, RequestOptions, Headers} from "@angular/http";
import {Observable} from "rxjs/Observable";
import {Donation} from "../_models/donation.model";
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class DonationService  {

  constructor(private http: Http,
              @Inject('APP_API_URL') private apiUrl: string,
              ) {

  }

  createDonation(deadline: Date,
                 description: string,
                 city: string,
                 phoneNumber: string,
                 status: string) {

    const queryUrl = `${this.apiUrl}donations/create/`;
    let data = {deadline: deadline, description: description, city: city, phoneNumber: phoneNumber, status: status};
    let header = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: header });
    return this.http.post(queryUrl, JSON.stringify(data), options)
      .map(response => response.json())
      .catch(this.handle_error);

  }

  listDonations() {
    const queryUrl = `${this.apiUrl}donations/`;
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
                  deadline: Date,
                  description: string,
                  city: string,
                  phoneNumber: string,
                  status: string) {
    const queryUrl = `${this.apiUrl}donations/${id}/`;
    let data = {deadline: deadline, description: description, city: city, phoneNumber: phoneNumber, status: status};
    let header = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: header });
    return this.http.put(queryUrl, JSON.stringify(data), options)
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
