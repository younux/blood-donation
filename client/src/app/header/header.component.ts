import {Component, Inject, OnInit} from '@angular/core';
import {IsLoogedInService} from "../_services/is-looged-in.service";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  isLoggedIn: boolean;

  constructor(private isLoggedInService: IsLoogedInService) { }

  ngOnInit() {
    this.isLoggedIn = false;
    this.isLoggedInService.isLoggedIn().subscribe(isLoggedInValue => this.isLoggedIn = isLoggedInValue);
  }

}
