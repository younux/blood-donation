import { Injectable } from '@angular/core';
import {Observable} from "rxjs/Observable";
import {BehaviorSubject} from "rxjs/BehaviorSubject";

@Injectable()
export class AuthenticationStatusEmitterService {
  private subject = new BehaviorSubject<boolean>(false);

  constructor() { }

  loggedIn() {
    this.subject.next(true);
  }

  loggedOut() {
    this.subject.next(false);
  }

  isAuthenticated(): Observable<boolean> {
    return this.subject.asObservable();
  }

  isAuthenticatedValue(): boolean {
    return this.subject.getValue();
  }
}
