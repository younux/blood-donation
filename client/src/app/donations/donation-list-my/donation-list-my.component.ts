import { Component, OnInit } from '@angular/core';
import {Donation} from "../../shared/models/donation.model";
import {DonationService} from "../../shared/services/donation.service";
import {AlertService} from "../../shared/services/alert.service";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-donation-list-my',
  templateUrl: './donation-list-my.component.html',
  styleUrls: ['./donation-list-my.component.scss']
})
export class DonationListMyComponent implements OnInit {

  donationsList: Donation[];

  constructor(private donationService: DonationService,
              private alertService: AlertService,
              private router: Router,
              private route: ActivatedRoute) {

  }

  ngOnInit() {
    this.route.queryParams.subscribe(
      params => {
        let username = params['username'];
        this.donationService.listDonations(username).subscribe(
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
