import { Component, OnInit } from '@angular/core';
import {DonationService} from "../_services/donation.service";
import {Donation} from "../_models/donation.model";
import {AlertService} from "../_services/alert.service";

@Component({
  selector: 'app-donation',
  templateUrl: './donation.component.html',
  styleUrls: ['./donation.component.scss']
})
export class DonationComponent implements OnInit {

  donationsList: Donation[];

  constructor(private donationService: DonationService,
              private alertService: AlertService,
              ) {

  }

  ngOnInit() {
    this.donationService.listDonations().subscribe(
      response => {
        this.donationsList = response.results;
      },
      err => {
        const alerts = this.alertService.getAllJsonValues(err);
        this.alertService.error(alerts);
      }
    );
  }

  onDonationSelected(donation: Donation) {
    console.log('selected donation : ' + donation.id);
  }

}
