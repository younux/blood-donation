import { Injectable } from '@angular/core';
import {Subject} from "rxjs/Subject";
import {Observable} from "rxjs/Observable";

@Injectable()
export class IsLoogedInService {
  private subject = new Subject<boolean>();

  constructor() {

  }

  loggedIn() {
    this.subject.next(true);
  }

  loggedOut(){
    this.subject.next(false);
  }

  isLoggedIn(): Observable<boolean> {
    return this.subject.asObservable();
  }

}
