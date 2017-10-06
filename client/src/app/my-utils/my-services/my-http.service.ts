import { Injectable } from '@angular/core';
import {
  Http, Request, RequestOptions, RequestOptionsArgs, Response, Headers,
  XHRBackend
} from "@angular/http";
import {Observable} from "rxjs/Observable";
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import {Router} from "@angular/router";
import {AuthenticationStatusEmitterService} from "./authentication-status-emitter.service";
import {LocalStorageService} from "./local-storage.service";

const DEFAULT_HEADER_NAME = 'Authorization';
const DEFAULT_HEADER_PREFIX = 'JWT';

@Injectable()
export class MyHttpService extends Http {
  private config: InterceptorConfig;

  constructor(backend: XHRBackend,
              defaultOptions: RequestOptions,
              private router: Router,
              private authenticationStatusEmitterService: AuthenticationStatusEmitterService,
              private localStorageService: LocalStorageService) {
    super(backend, defaultOptions);
    this.config = new InterceptorConfig(DEFAULT_HEADER_NAME, DEFAULT_HEADER_PREFIX);
  }

  request(url: string | Request, options?: RequestOptionsArgs): Observable<Response> {
    const jwtToken: string = this.localStorageService.readTokenFromLocalStorage();
    if (jwtToken) {
      // useful when user logs in or logs out when using multiple tabs
      if (!this.authenticationStatusEmitterService.isAuthenticatedValue()) {
        this.authenticationStatusEmitterService.loggedIn();
      }
      if (typeof url === 'string') { // meaning we have to add the token to the options, not in url
        if (!options) {
          // let's make option object
          options = {headers: new Headers()};
        }
        options.headers.set(this.config.headerName, this.config.headerPrefix + ' ' + jwtToken);

      } else {
        // we have to add the token to the url object
        url.headers.set(this.config.headerName, this.config.headerPrefix + ' ' + jwtToken);
      }
    }else {
      // useful when user logs in or logs out when using multiple tabs
      if (this.authenticationStatusEmitterService.isAuthenticatedValue()){
        this.authenticationStatusEmitterService.loggedOut();
      }
    }

    return super.request(url, options);
  }

  get(url: string, options?: RequestOptionsArgs): Observable<Response> {
    return this.intercept(super.get(url, this.getRequestOptionArgs(options)));
  }

  post(url: string, body: any, options?: RequestOptionsArgs, noIntercept?: boolean): Observable<Response> {
    return this.intercept(super.post(url, body, this.getRequestOptionArgs(options)));
  }

  put(url: string, body: any, options?: RequestOptionsArgs, noIntercept?: boolean): Observable<Response> {
    return this.intercept(super.put(url, body, this.getRequestOptionArgs(options)));

  }

  delete(url: string, options?: RequestOptionsArgs, noIntercept?: boolean): Observable<Response> {
    return this.intercept(super.delete(url, options));
  }

  private intercept(observable: Observable<Response>): Observable<Response> {
    return observable
      .map( response => {
        const authHeader = response.headers.get('Authorization');
        if (authHeader) {
          // store jwt token in local storage
          this.localStorageService.writeTokenInLocalStorage(authHeader.split(' ')[1]);
        }
      return response;
      })
      .catch(err => {
        // Check if we have Unauthorised request
        if (err.status === 401) {
          console.log("MyHttpService : Unauthorised : no token or session expired");
          if (err.json().detail) {
            // Check if the session has expired
            if (err.json().detail === "Signature has expired.") {
              console.log("MyHttpService : session expired");
              // Redirect to login screen
              this.router.navigate(['/profiles', 'login']);
            }
          }
        }
        return Observable.throw(err);
      });

  }

  private getRequestOptionArgs(options?: RequestOptionsArgs): RequestOptionsArgs {
    if (options == null) {
      options = new RequestOptions();
    }
    if (options.headers == null) {
      options.headers = new Headers();
    }
    options.headers.append('Content-Type', 'application/json');
    return options;
  }
}


export class InterceptorConfig {

  headerName: string;
  headerPrefix: string;

  constructor(headerName: string, headerPrefix: string) {
    this.headerName = headerName;
    this.headerPrefix = headerPrefix;
  }
}

export function myHttpServiceFactory(backend: XHRBackend,
                                     options: RequestOptions,
                                     router: Router,
                                     authenticationStatusEmitterService: AuthenticationStatusEmitterService,
                                     localStorageService: LocalStorageService) {
  return new MyHttpService(backend, options, router, authenticationStatusEmitterService, localStorageService);
 }


 // See to add spinner in the custom http : https://medium.com/beautiful-angular/show-loader-on-every-request-in-angular-2-9a0fca86afef
