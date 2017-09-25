import { Injectable } from '@angular/core';
import {Observable} from "rxjs/Observable";
import {BehaviorSubject} from "rxjs/BehaviorSubject";

@Injectable()
export class IsLoggedInService {
  private subject = new BehaviorSubject<boolean>(false);

  constructor() {

  }

  loggedIn() {
    this.subject.next(true);
  }

  loggedOut() {
    this.subject.next(false);
  }

  isLoggedIn(): Observable<boolean> {
    return this.subject.asObservable();
  }

  isLoggedInValue(): boolean {
    return this.subject.getValue();
  }

}
