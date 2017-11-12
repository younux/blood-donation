import {Inject, Injectable, Injector} from '@angular/core';
import {Observable} from "rxjs/Observable";
import {BehaviorSubject} from "rxjs/BehaviorSubject";
import {Profile} from "../models/profile.model";
import {MyHttpService} from "./my-http.service";
import {AuthenticationStatusEmitterService} from "./authentication-status-emitter.service";
import {LocalStorageService} from "./local-storage.service";
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import {Address} from "../models/address.model";


@Injectable()
export class AuthenticationService {

  private subject = new BehaviorSubject<boolean>(false);
  public profile: Profile;  // current authenticated profiles

  constructor(private http: MyHttpService,
              private localStorageService: LocalStorageService,
              private authenticationStatusEmitter: AuthenticationStatusEmitterService,
              @Inject('APP_API_URL') private apiUrl: string) {
    // Init is useful when a new tab is opened or in refresh
    this.init();
    // Subscribe to auth status : useful when user logs in or logs out when using multiple tabs
    this.authenticationStatusEmitter.isAuthenticated().subscribe(
      authenticatedValue => {
        if (authenticatedValue && !this.profile) {
          this.profile = this.localStorageService.readProfileFromLocalStorage();
        }else if (!authenticatedValue && this.profile) {
            this.profile = null;
        }
      }
    )
  }

  init() {
    // Check if the user is already connected when starting the app
    const readenProfile = this.localStorageService.readProfileFromLocalStorage();
    const readenToken = this.localStorageService.readTokenFromLocalStorage();
    if (readenProfile && readenToken) {
      // Copy the profiles to profiles attribute
      this.profile = readenProfile;
      // Broadcast login event
      this.authenticationStatusEmitter.loggedIn();
    } else {
      // Delete profiles and token from local storage
      this.localStorageService.removeProfileFromLocalStorage();
      this.localStorageService.removeTokenFromLocalStorage();
      // Boadcast logout event
      this.authenticationStatusEmitter.loggedOut();
    }
  }

  login(username: string, email: string, password: string) {
    const data = {username: username, email: email, password: password};
    const queryUrl = `${this.apiUrl}accounts/login/`;
    return this.http.post(queryUrl, JSON.stringify(data))
      .map(response => {
        // Save the profiles in profiles attribute.
        this.profile = response.json();
        // Save the profiles in local storage
        this.localStorageService.writeProfileInLocalStorage(this.profile);
        // Broadcast the login event
        this.authenticationStatusEmitter.loggedIn();
        return this.profile;
      })
      .catch(this.handle_error);
  }

  logout() {
    // delete profiles attribute
    this.profile = null;
    // remove profiles from local storage
    this.localStorageService.removeProfileFromLocalStorage();
    this.localStorageService.removeTokenFromLocalStorage();
    // Broadcast the logout event
    this.authenticationStatusEmitter.loggedOut();
  }

  register(username: string,
           email: string,
           password: string,
           firstName: string,
           lastName: string,
           gender: string,
           phoneNumber: string,
           addressStreet: string,
           addressCity: string,
           addressCountry: string,
           addressZipCode: string,
           birthDate: string,
           bloodType: string,
           emailNotification: boolean,
           smsNotification: boolean) {

    const address = new Address(addressStreet, addressCity, addressCountry, addressZipCode);
    let sentData = new Profile(username, email, firstName, lastName, gender, phoneNumber,
                                address, birthDate, bloodType, emailNotification,
                                smsNotification);
    sentData['password'] = password;
    const queryUrl = `${this.apiUrl}accounts/register/`;
    return this.http.post(queryUrl, JSON.stringify(sentData))
      .map(response => response.json())
      .catch(this.handle_error);
  }

  isAuthenticated(): Observable<boolean> {
    return this.authenticationStatusEmitter.isAuthenticated();
  }

  isAuthenticatedValue(): boolean {
    return this.authenticationStatusEmitter.isAuthenticatedValue();
  }

  activate(key: string, token: string) {
    const queryUrl = `${this.apiUrl}accounts/activate/`;
    const sentData = {'key': key, 'token': token};
    return this.http.post(queryUrl, JSON.stringify(sentData))
      .map(response => {
        return response.json();
      })
      .catch(this.handle_error);
  }

  passwordResetRequest(email: string) {
    const queryUrl = `${this.apiUrl}accounts/reset-password/request/`;
    const sentData = {'email': email};
    return this.http.post(queryUrl, JSON.stringify(sentData))
      .map(response => {
        return response.json();
      })
      .catch(this.handle_error);
  }

  passwordResetVerify(key: string, token: string) {
    const queryUrl = `${this.apiUrl}accounts/reset-password/verify/`;
    const sentData = {'key': key, 'token': token};
    return this.http.post(queryUrl, JSON.stringify(sentData))
      .map(response => {
        return response.json();
      })
      .catch(this.handle_error);
  }

  passwordReset(key: string, token: string, password: string) {
    const queryUrl = `${this.apiUrl}accounts/reset-password/reset/`;
    const sentData = {'key': key, 'token': token, 'password': password};
    return this.http.post(queryUrl, JSON.stringify(sentData))
      .map(response => {
        return response.json();
      })
      .catch(this.handle_error);
  }

  phoneCodeRequest(phoneNumber: string) {
    const queryUrl = `${this.apiUrl}accounts/phone/request-code/`;
    const sentData = {'phoneNumber': phoneNumber};
    return this.http.post(queryUrl, JSON.stringify(sentData))
      .map(response => {
        return response.json();
      })
      .catch(this.handle_error);
  }

  phoneVerify(phoneNumber: string, code: string) {
    const queryUrl = `${this.apiUrl}accounts/phone/verify/`;
    const sentData = {'phoneNumber': phoneNumber, 'code': code};
    return this.http.post(queryUrl, JSON.stringify(sentData))
      .map(response => {
        return response.json();
      })
      .catch(this.handle_error);
  }

  private handle_error(error: any): any {
    return Observable.throw(error.json());
  }

}
