import { Injectable } from '@angular/core';
import {Profile} from "../models/profile.model";

const JWT_KEY_IN_LOCALSTORAGE = 'JWT_TOKEN';
const CURRENT_PROFILE_KEY_IN_LOCALSTORAGE = 'CURRENT_PROFILE';


@Injectable()
export class LocalStorageService {

  constructor() { }

  writeTokenInLocalStorage(token: string) {
    localStorage.setItem(JWT_KEY_IN_LOCALSTORAGE, token);
  }

  readTokenFromLocalStorage(): string {
    return localStorage.getItem(JWT_KEY_IN_LOCALSTORAGE);
  }

  removeTokenFromLocalStorage() {
    localStorage.removeItem(JWT_KEY_IN_LOCALSTORAGE);
  }

  writeProfileInLocalStorage(profile: Profile) {
    localStorage.setItem(CURRENT_PROFILE_KEY_IN_LOCALSTORAGE, JSON.stringify(profile));
  }

  readProfileFromLocalStorage(): Profile {
    return JSON.parse(localStorage.getItem(CURRENT_PROFILE_KEY_IN_LOCALSTORAGE)) as Profile;
  }

  removeProfileFromLocalStorage() {
    localStorage.removeItem(CURRENT_PROFILE_KEY_IN_LOCALSTORAGE);
  }

}
