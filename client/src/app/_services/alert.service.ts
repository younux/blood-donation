import { Injectable } from '@angular/core';
import { Router, NavigationStart } from '@angular/router';
import { Observable } from 'rxjs/';
import { Subject } from 'rxjs/Subject';

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

  success(alerts: string[], keepAfterNavigationChange = false) {
    this.keepAfterNavigationChange = keepAfterNavigationChange;
    this.subject.next({ type: 'success', text: alerts });
  }

  error(alerts: string[], keepAfterNavigationChange = false) {
    this.keepAfterNavigationChange = keepAfterNavigationChange;
    this.subject.next({ type: 'error', text: alerts });
  }

  getMessage(): Observable<any> {
    return this.subject.asObservable();
  }

  // gets all string values contained in a json object
  getAllJsonValues(jsonData: object): string[] {
    let stringArray = new Array<string>();
    for (let elt in jsonData) {
      if ((typeof jsonData[elt]) === 'string') {
        stringArray.push(jsonData[elt]);
      } else if ((typeof jsonData[elt]) === 'object') {
        stringArray = stringArray.concat(this.getAllJsonValues(jsonData[elt]));
      }
    }
    return stringArray;
  }

}
