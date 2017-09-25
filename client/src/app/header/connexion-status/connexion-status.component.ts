import { Component, OnInit } from '@angular/core';
import {Profile} from "../../_models/profile.model";
import {IsLoggedInService} from "../../_services/is-logged-in.service";
import {ProfileService} from "../../_services/profile.service";
import {AlertService} from "../../_services/alert.service";

@Component({
  selector: 'app-connexion-status',
  templateUrl: './connexion-status.component.html',
  styleUrls: ['./connexion-status.component.scss']
})
export class ConnexionStatusComponent implements OnInit {

  isLoggedIn: boolean;
  myPofile: Profile;

  constructor(private isLoggedInService: IsLoggedInService,
              private profileService: ProfileService,
              private alertService: AlertService) { }

  ngOnInit() {
    this.isLoggedIn = false;
    this.isLoggedInService.isLoggedIn().subscribe(isLoggedInValue => {
      this.isLoggedIn = isLoggedInValue;
      this.myPofile = JSON.parse(localStorage.getItem('currentProfile'));
    });
  }

  logout() {
    this.profileService.logout();
    this.alertService.success(['You have successfully logged out']);
  }


}
