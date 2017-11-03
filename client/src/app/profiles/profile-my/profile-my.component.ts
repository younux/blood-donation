import { Component, OnInit } from '@angular/core';
import {Profile} from "../../shared/models/profile.model";
import {AuthenticationService} from "../../shared/services/authentication.service";

@Component({
  selector: 'app-profile-my',
  templateUrl: './profile-my.component.html',
  styleUrls: ['./profile-my.component.scss']
})
export class ProfileMyComponent implements OnInit {

  myProfile: Profile;
  tab = 'information';

  constructor(private authenticationService: AuthenticationService) { }

  ngOnInit() {
    this.myProfile = this.authenticationService.profile;
  }


}
