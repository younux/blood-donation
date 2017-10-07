import { Injectable } from '@angular/core';
import {Subject} from "rxjs/Subject";


@Injectable()
export class LoaderService {

  private loaderSubject = new Subject<boolean>();

  constructor() { }

  show() {
    this.loaderSubject.next(true);
  }
  hide() {
    this.loaderSubject.next(false);
  }

  loaderState() {
    return this.loaderSubject.asObservable();
  }

}
