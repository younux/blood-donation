import {Injectable, Inject } from '@angular/core';
import {Http, RequestOptions, Headers, Response} from "@angular/http";
import {Profile} from "../_models/profile.model";
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import {Observable} from "rxjs/Observable";


@Injectable()
export class ProfileService {

  constructor(private http: Http,
              @Inject('APP_API_URL') private apiUrl: string) {

  }

  login(username: string, email: string, password: string) {
    let data = {username: username, email: email, password: password};
    let queryUrl = `${this.apiUrl}accounts/login/`;
    let header = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({headers: header });
    return this.http.post(queryUrl, JSON.stringify(data), options)
      .map(response => {
        let headers = response.headers;
        let jwtToken = headers.get('Authorization').split(' ')[1];
        let profile = response.json();
        if (jwtToken) {
          // store profile details and jwt token in local storage to keep profile logged in between page refreshes
          localStorage.setItem('currentProfile', JSON.stringify(profile));
          localStorage.setItem('jwtToken', jwtToken);
        }
        return profile;
      })
      .catch(this.handle_error);

  }

  logout() {
    // remove profile from local storage to log it out
    localStorage.removeItem('currentProfile');
    localStorage.removeItem('jwtToken');
  }

  register(profileInfo: any) {
    //TODO Add password to the json sent to server because profile does not contain password
    const queryUrl = `${this.apiUrl}accounts/register/`;
    let header = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({headers: header });
    return this.http.post(queryUrl, JSON.stringify(profileInfo), options)
      .map(response => {
        let headers = response.headers;
        let jwtToken = headers.get('Authorization').split(' ')[1];
        let profile = response.json();
        if (jwtToken) {
          // store profile details and jwt token in local storage to keep profile logged in between page refreshes
          localStorage.setItem('currentProfile', JSON.stringify(profile));
          localStorage.setItem('jwtToken', jwtToken);
        }
        return profile;
      })
      .catch(this.handle_error);
  }

  private handle_error(error: any): any {
    return Observable.throw(error.json());
  }

}
