import {Inject, Injectable, Injector} from '@angular/core';
import {Observable} from "rxjs/Observable";
import {BehaviorSubject} from "rxjs/BehaviorSubject";
import {Profile} from "../my-models/profile.model";
import {MyHttpService} from "./my-http.service";
import {AuthenticationStatusEmitterService} from "./authentication-status-emitter.service";
import {LocalStorageService} from "./local-storage.service";

@Injectable()
export class AuthenticationService {

  private subject = new BehaviorSubject<boolean>(false);
  public profile: Profile;  // current authenticated profile

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
      // Copy the profile to profile attribute
      this.profile = readenProfile;
      // Broadcast login event
      this.authenticationStatusEmitter.loggedIn();
    } else {
      // Delete profile and token from local storage
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
        // Save the profile in profile attribute.
        this.profile = response.json();
        // Save the profile in local storage
        this.localStorageService.writeProfileInLocalStorage(this.profile);
        // Broadcast the login event
        this.authenticationStatusEmitter.loggedIn();
        return this.profile;
      })
      .catch(this.handle_error);
  }

  logout() {
    // delete profile attribute
    this.profile = null;
    // remove profile from local storage
    this.localStorageService.removeProfileFromLocalStorage();
    this.localStorageService.removeTokenFromLocalStorage();
    // Broadcast the logout event
    this.authenticationStatusEmitter.loggedOut();
  }

  register(profileInfo: any) {
    const queryUrl = `${this.apiUrl}accounts/register/`;
    return this.http.post(queryUrl, JSON.stringify(profileInfo))
      .map(response => {
        // Save the profile in profile attribute.
        this.profile = response.json();
        // Save the profile in local storage
        this.localStorageService.writeProfileInLocalStorage(this.profile);
        // Broadcast the login event
        this.authenticationStatusEmitter.loggedIn();
        return this.profile;
      })
      .catch(this.handle_error);
  }

  private handle_error(error: any): any {
    return Observable.throw(error.json());
  }

  isAuthenticated(): Observable<boolean> {
    return this.authenticationStatusEmitter.isAuthenticated();
  }

  isAuthenticatedValue(): boolean {
    return this.authenticationStatusEmitter.isAuthenticatedValue();
  }

}
