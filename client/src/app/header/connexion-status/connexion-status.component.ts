import { Component, OnInit } from '@angular/core';
import {Profile} from "../../my-utils/my-models/profile.model";
import {AuthenticationService} from "../../my-utils/my-services/authentication.service";
import {ProfileService} from "../../my-utils/my-services/profile.service";
import {AlertService} from "../../my-utils/my-services/alert.service";

@Component({
  selector: 'app-connexion-status',
  templateUrl: './connexion-status.component.html',
  styleUrls: ['./connexion-status.component.scss']
})
export class ConnexionStatusComponent implements OnInit {

  isAuthenticated: boolean;
  myPofile: Profile;

  constructor(private authenticationService: AuthenticationService,
              private profileService: ProfileService,
              private alertService: AlertService) { }

  ngOnInit() {
    this.isAuthenticated = false;
    this.authenticationService.isAuthenticated().subscribe(isAuthenticatedValue => {
      this.isAuthenticated = isAuthenticatedValue;
      this.myPofile = this.authenticationService.getProfile();

    });
  }

  logout() {
    this.profileService.logout();
    this.alertService.success(['You have successfully logged out']);
  }


}
