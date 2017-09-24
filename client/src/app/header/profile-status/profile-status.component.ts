import { Component, OnInit } from '@angular/core';
import {Profile} from "../../_models/profile.model";
import {IsLoogedInService} from "../../_services/is-looged-in.service";
import {ProfileService} from "../../_services/profile.service";
import {AlertService} from "../../_services/alert.service";

@Component({
  selector: 'app-profile-status',
  templateUrl: './profile-status.component.html',
  styleUrls: ['./profile-status.component.scss']
})
export class ProfileStatusComponent implements OnInit {

  isLoggedIn: boolean;
  myPofile: Profile;

  constructor(private isLoggedInService: IsLoogedInService,
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
