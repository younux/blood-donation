import {Inject, Injectable} from '@angular/core';
import {Http} from "@angular/http";
import {Observable} from "rxjs/Observable";
import {Donation} from "./donation.model";
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class DonationService  {

  constructor(private http: Http,
              @Inject('APP_API_URL') private apiKey: string,
              ) {

  }

  list() {
    const queryUrl = `${this.apiKey}donations/`;
    return this.http.get(queryUrl)
      .map(response => {
        return response.json();
      })
      .catch(this.handle_error);

  }


  private handle_error(error: any , caught: any): any {
    console.log(error, caught);
  }

}
