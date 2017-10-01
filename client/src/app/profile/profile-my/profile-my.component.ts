import { Component, OnInit } from '@angular/core';
import {Profile} from "../../my-utils/my-models/profile.model";
import {AuthenticationService} from "../../my-utils/my-services/authentication.service";

@Component({
  selector: 'app-profile-my',
  templateUrl: './profile-my.component.html',
  styleUrls: ['./profile-my.component.scss']
})
export class ProfileMyComponent implements OnInit {

  myProfile: Profile;

  constructor(private authenticationService: AuthenticationService) { }

  ngOnInit() {
    this.myProfile = this.authenticationService.profile;
  }


}
