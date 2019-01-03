import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {AuthenticationService} from "../../shared/services/authentication.service";
import {Profile} from "../../shared/models/profile.model";
import {AlertService} from "../../shared/services/alert.service";

@Component({
  selector: 'app-right-side-bar',
  templateUrl: './right-side-bar.component.html',
  styleUrls: ['./right-side-bar.component.scss']
})
export class RightSideBarComponent implements OnInit {

  isAuthenticated: boolean;
  isModerator: boolean;
  myPofile: Profile;
  @Output() closeMenu: EventEmitter<boolean> = new EventEmitter<boolean>();

  constructor(private authenticationService: AuthenticationService,
              private alertService: AlertService) { }

  ngOnInit() {
    this.isAuthenticated = false;
    this.isModerator = false;
    this.authenticationService.isAuthenticated().subscribe(isAuthenticatedValue => {
      this.isAuthenticated = isAuthenticatedValue;
      this.myPofile = this.authenticationService.profile;
      this.isModerator = this.authenticationService.isModerator();
    });
  }

  onCloseClick(){
    this.closeMenu.emit(true);
  }

  logout() {
    this.authenticationService.logout();
    this.alertService.success('You have successfully logged out');
  }
}
