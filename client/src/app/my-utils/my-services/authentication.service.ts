import { Injectable } from '@angular/core';
import {Observable} from "rxjs/Observable";
import {BehaviorSubject} from "rxjs/BehaviorSubject";
import {Profile} from "../my-models/profile.model";

const JWT_KEY_IN_LOCALSTORAGE = 'JWT_TOKEN';
const CURRENT_PROFILE_KEY_IN_LOCALSTORAGE = 'CURRENT_PROFILE';

@Injectable()
export class AuthenticationService {

  private subject = new BehaviorSubject<boolean>(false);

  constructor() {
    // Check if the user is already connected
    this.isAuthenticatedValue();
  }


  logIn(profile: Profile) {
    this.setProfile(profile);
    this.subject.next(true);
  }

  logOut() {
    this.deleteProfile();
    this.deleteToken();
    this.subject.next(false);
  }

  isAuthenticated(): Observable<boolean> {
    // This is a useful check when using the app after a page refresh or when used with many tabs
    if (this.getProfile() && this.getToken()){
      this.subject.next(true);  // Emit true beacuse user is considered connected
    } else {
      this.logOut();  // make sure to clear local storage and emit false to others
    }
    return this.subject.asObservable();
  }

  isAuthenticatedValue(): boolean {
    // This is a useful check when using the app after a page refresh or when used with many tabs
    if (this.getProfile() && this.getToken()){
      this.subject.next(true); // Emit true beacuse user is considered connected
    } else {
      this.logOut(); // make sure to clear local storage and emit false to others
    }
    return this.subject.getValue();
  }

  setToken(token: string) {
    localStorage.setItem(JWT_KEY_IN_LOCALSTORAGE, token);
  }

  getToken(): string {
    return localStorage.getItem(JWT_KEY_IN_LOCALSTORAGE);
  }

  deleteToken() {
    localStorage.removeItem(JWT_KEY_IN_LOCALSTORAGE);
  }

  setProfile(profile: Profile) {
    localStorage.setItem(CURRENT_PROFILE_KEY_IN_LOCALSTORAGE, JSON.stringify(profile));
  }

  getProfile(): Profile {
    return JSON.parse(localStorage.getItem(CURRENT_PROFILE_KEY_IN_LOCALSTORAGE)) as Profile;
  }

  deleteProfile() {
    localStorage.removeItem(CURRENT_PROFILE_KEY_IN_LOCALSTORAGE);
  }

}
