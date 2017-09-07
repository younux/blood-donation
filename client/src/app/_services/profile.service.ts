import {Injectable, Inject } from '@angular/core';
import {Http, RequestOptions, Headers, Response} from "@angular/http";
import {Profile} from "../_models/profile.model";
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';


@Injectable()
export class ProfileService {

  constructor(private http: Http,
              @Inject('APP_API_URL') private apiKey: string) {

  }

  login(username: string, email: string, password: string) {
    let data = {username: username, email: email, password: password};
    let queryUrl = `${this.apiKey}accounts/login/`;
    return this.http.post(queryUrl, JSON.stringify(data))
      .map(response => {
        let headers = response.headers;
        let jwtToken = headers.get("Authorization");
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
    localStorage.removeItem('currentUser');
    localStorage.remote('jwtToken');
  }

  register(profile: Profile, password: string) {
    //TODO Add password to the json sent to server because profile does not contain password
    let data: any = profile as any;
    data["password"] = password;
    const queryUrl = `${this.apiKey}accounts/register/`;
    let header = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({headers: header });
    return this.http.post(queryUrl, JSON.stringify(data), options)
      .map(response => response.json())
      .catch(this.handle_error);
  }

  private handle_error(error: any , caught: any): any {
    console.log(error, caught);
  }

}
