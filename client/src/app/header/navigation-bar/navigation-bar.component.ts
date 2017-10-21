import { Component, OnInit } from '@angular/core';
import {AuthenticationService} from '../../shared/services/authentication.service';
import {Profile} from '../../shared/models/profile.model';
import {AlertService} from '../../shared/services/alert.service';

@Component({
  selector: 'app-navigation-bar',
  templateUrl: './navigation-bar.component.html',
  styleUrls: ['./navigation-bar.component.scss']
})
export class NavigationBarComponent implements OnInit {

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
