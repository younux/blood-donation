import { Component, OnInit } from '@angular/core';
import { DonationService } from '../../shared/services/donation.service';
import { Donation } from '../../shared/models/donation.model';
import { AlertService } from '../../shared/services/alert.service';
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-donation-list-all',
  templateUrl: './donation-list-all.component.html',
  styleUrls: ['./donation-list-all.component.scss']
})
export class DonationListAllComponent implements OnInit {

  donationsList: Donation[];

  constructor(private route: ActivatedRoute,
              private donationService: DonationService,
              private alertService: AlertService) {

  }

  ngOnInit() {
    this.route.queryParams.subscribe(
      queryParameters => {
        let sentQueryParamsArray: String[] = [];
        // read query params from url
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
            const alerts = this.alertService.getAllJsonValues(err);
            this.alertService.error(alerts);
          }
        );
      }

    );

  }

}
