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
          this.subject.next(null);
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

  // converts the json data to a string containing html list
  jsonToHtmlList(jsonData: object): string {
    // creating the root list (ul)
    let messageHtml = '<ul>';
    // If this is an array, all elements will be put as list elements
    if (jsonData instanceof Array){
      for (let index = 0; index < jsonData.length; index++) {
        messageHtml += `<li> ${jsonData[index]} </li>`;
      }
    } else if (jsonData instanceof Object) {
      // If this is an object (json), go deeper by looping over keys
      for (let key in jsonData) {
          // adding each key as list element
          messageHtml += `<li> ${key} </li>`;
            if (jsonData[key] instanceof Object || jsonData[key] instanceof Array) {
              // If the value corresponding to the key is an object or an array
              // we call this function (iterating) on this object/array, which will
              // be creating a new list (ul)
              messageHtml += this.jsonToHtmlList(jsonData[key]);
          } else {
              // If the value corresponding to the key is not object/array
              // we do not need to iterate. The value will be added as single
              // element list
             messageHtml += `<ul> <li> ${jsonData[key]}  </li></ul>`;
           }
        }
    }
    // close the root list
    messageHtml += '</ul>';
    return messageHtml;
  }
}
