import { Component, OnInit } from '@angular/core';
import {AuthenticationService} from "../../shared/services/authentication.service";

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent implements OnInit {

  isAuthenticated: boolean;

  constructor(private authenticationService: AuthenticationService) {
  }

  ngOnInit() {
    this.isAuthenticated = false;
    this.authenticationService.isAuthenticated().subscribe(isAuthenticatedValue => {
      this.isAuthenticated = isAuthenticatedValue;
    });
  }

}
