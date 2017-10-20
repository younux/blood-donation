import { Component, OnInit } from '@angular/core';
import {Profile} from "../../shared/models/profile.model";
import {AuthenticationService} from "../../shared/services/authentication.service";
import {AlertService} from "../../shared/services/alert.service";

@Component({
  selector: 'app-connexion-status',
  templateUrl: './connexion-status.component.html',
  styleUrls: ['./connexion-status.component.scss']
})
export class ConnexionStatusComponent implements OnInit {

  isAuthenticated: boolean;
  myPofile: Profile;

  constructor(private authenticationService: AuthenticationService,
              private alertService: AlertService) { }

  ngOnInit() {
    this.isAuthenticated = false;
    this.authenticationService.isAuthenticated().subscribe(isAuthenticatedValue => {
      this.isAuthenticated = isAuthenticatedValue;
      this.myPofile = this.authenticationService.profile;

    });
  }

  logout() {
    this.authenticationService.logout();
    this.alertService.success('You have successfully logged out');
  }


}
