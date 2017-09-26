import {Injectable, Inject } from '@angular/core';
import {Http, RequestOptions, Headers, Response} from "@angular/http";
import {Profile} from "../my-models/profile.model";
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import {Observable} from "rxjs/Observable";
import {MyHttpService} from "./my-http.service";
import {AuthenticationService} from "./authentication.service";


@Injectable()
export class ProfileService {

  constructor(private http: MyHttpService,
              private authenticationService: AuthenticationService,
              @Inject('APP_API_URL') private apiUrl: string) {
  }

  login(username: string, email: string, password: string) {
    let data = {username: username, email: email, password: password};
    let queryUrl = `${this.apiUrl}accounts/login/`;
    return this.http.post(queryUrl, JSON.stringify(data))
      .map(response => {
        let profile = response.json();
        // Use the service to Save profile detail and log in
        this.authenticationService.logIn(profile);
        return profile;
      })
      .catch(this.handle_error);

  }

  logout() {
    // remove profile from local storage and log out
    this.authenticationService.logOut();
  }

  register(profileInfo: any) {
    const queryUrl = `${this.apiUrl}accounts/register/`;
    return this.http.post(queryUrl, JSON.stringify(profileInfo))
      .map(response => {
        let profile = response.json();
        // Use the service to Save profile detail and loggin
        this.authenticationService.logIn(profile);
        return profile;
      })
      .catch(this.handle_error);
  }

  private handle_error(error: any): any {
    return Observable.throw(error.json());
  }

}
