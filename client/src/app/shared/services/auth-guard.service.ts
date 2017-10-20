import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { AuthenticationService } from './authentication.service';


@Injectable()
export class AuthGuardService implements CanActivate{

  constructor(private authenticationService: AuthenticationService,
              private router: Router) {

  }

  canActivate(): boolean {
    if (this.authenticationService.isAuthenticatedValue()){
      return true;
    }else {
      this.router.navigate(['/profiles', 'login']);
      return false;
    }
  }
}
