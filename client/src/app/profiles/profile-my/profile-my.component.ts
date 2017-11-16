import { Component, OnInit } from '@angular/core';
import {Profile} from "../../shared/models/profile.model";
import {AuthenticationService} from "../../shared/services/authentication.service";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-profile-my',
  templateUrl: './profile-my.component.html',
  styleUrls: ['./profile-my.component.scss']
})
export class ProfileMyComponent implements OnInit {

  myProfile: Profile;
  tab = 'information';

  constructor(private authenticationService: AuthenticationService,
              private route: ActivatedRoute) { }

  ngOnInit() {
    this.myProfile = this.authenticationService.profile;
    this.tab = this.route.snapshot.queryParams['tab'] || this.tab;
  }


}
