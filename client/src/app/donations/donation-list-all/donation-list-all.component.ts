import { Component, OnInit } from '@angular/core';
import { DonationService } from '../../shared/services/donation.service';
import { Donation } from '../../shared/models/donation.model';
import { AlertService } from '../../shared/services/alert.service';

@Component({
  selector: 'app-donation-list-all',
  templateUrl: './donation-list-all.component.html',
  styleUrls: ['./donation-list-all.component.scss']
})
export class DonationListAllComponent implements OnInit {

  donationsList: Donation[];

  constructor(private donationService: DonationService,
              private alertService: AlertService) {

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
    console.log('DonationComponent : selected donations : ' + donation.id);
  }
}
