import { Injectable } from '@angular/core';
import { Router, NavigationStart } from '@angular/router';
import { Observable } from 'rxjs/';
import { Subject } from 'rxjs/Subject';
import {forEach} from "@angular/router/src/utils/collection";

@Injectable()
export class AlertService {

  private subject = new Subject<any>();
  private keepAfterNavigationChange = false;

  constructor(private router: Router) {
    // clear alert message on route change
    router.events.subscribe(event => {
      if (event instanceof NavigationStart) {
        if (this.keepAfterNavigationChange) {
          // only keep for a single location change
          this.keepAfterNavigationChange = false;
        } else {
          // clear alert
          this.subject.next();
        }
      }
    });
  }

  success(alerts: string, keepAfterNavigationChange = false) {
    this.keepAfterNavigationChange = keepAfterNavigationChange;
    this.subject.next({ type: 'success', text: alerts });
  }

  error(alerts: string, keepAfterNavigationChange = false) {
    this.keepAfterNavigationChange = keepAfterNavigationChange;
    this.subject.next({ type: 'error', text: alerts });
  }

  getMessage(): Observable<any> {
    return this.subject.asObservable();
  }

  // gets all string values contained in a json object
  getAllJsonValues(jsonData: object): string {
    let messageText = '';
    if (jsonData instanceof Array){
      for (let index = 0; index < jsonData.length; index++) {
        messageText += `${jsonData[index]} <br/>`;
      }
    } else if (jsonData instanceof Object) {
        for (let key in jsonData) {
          messageText += `${key} <br/>`;
           if (jsonData[key] instanceof Object || jsonData[key] instanceof Array) {
             messageText += this.getAllJsonValues(jsonData[key]);
          } else {
             messageText += `${jsonData[key]} <br/>`;
           }
        }
    }
    return messageText;
  }
}
