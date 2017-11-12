import { Component, OnInit } from '@angular/core';
import {Donation} from "../../shared/models/donation.model";
import {DonationService} from "../../shared/services/donation.service";
import {AlertService} from "../../shared/services/alert.service";
import {ActivatedRoute, Router} from "@angular/router";
import {AuthenticationService} from "../../shared/services/authentication.service";
import {Profile} from "../../shared/models/profile.model";

@Component({
  selector: 'app-donation-list-my',
  templateUrl: './donation-list-my.component.html',
  styleUrls: ['./donation-list-my.component.scss']
})
export class DonationListMyComponent implements OnInit {

  donationsList: Donation[];
  myPofile: Profile;

  constructor(private route: ActivatedRoute,
              private authenticationService: AuthenticationService,
              private donationService: DonationService,
              private alertService: AlertService) {

  }

  ngOnInit() {

    this.myPofile = this.authenticationService.profile;

    this.route.queryParams.subscribe(
      queryParameters => {
        let sentQueryParamsArray: String[] = [];
        // Add username to sentQueryParamsArray
        sentQueryParamsArray.push(`username=${this.myPofile.username}`);
        // read query params from url
        const usernameParam = queryParameters['username'];
        const cityParam = queryParameters['city'];
        const keyWordParam = queryParameters['keyWord'];
        const bloodTypesParam = queryParameters['bloodTypes'];
        // add non falsy query parrams to sentQueryParamsArray
        if (cityParam) {
          sentQueryParamsArray.push(`city=${cityParam}`);
        }
        if (keyWordParam) {
          sentQueryParamsArray.push(`keyWord=${keyWordParam}`);
        }
        if (bloodTypesParam) {
          sentQueryParamsArray.push(`bloodTypes=${bloodTypesParam}`);
        }
        // Send list request with a query params string
        this.donationService.listDonations(sentQueryParamsArray.join('&')).subscribe(
          response => {
            this.donationsList = response.results;
          },
          err => {
            const alerts = this.alertService.jsonToHtmlList(err);
            this.alertService.error(alerts);
          }
        );
      }

    );

  }
}
