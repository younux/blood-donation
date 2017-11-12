import { Component, OnInit } from '@angular/core';
import {Donation} from "../../shared/models/donation.model";
import {DonationService} from "../../shared/services/donation.service";
import {ActivatedRoute} from "@angular/router";
import {AlertService} from "../../shared/services/alert.service";

@Component({
  selector: 'app-donation-detail',
  templateUrl: './donation-detail.component.html',
  styleUrls: ['./donation-detail.component.scss']
})
export class DonationDetailComponent implements OnInit {

  donation: Donation;
  donationId: number;

  constructor(private donationService: DonationService,
              private route: ActivatedRoute,
              private alertService: AlertService,
              ) {

  }

  ngOnInit() {
    this.donationId = this.route.snapshot.params['id'];
    this.donationService.getDonation(this.donationId).subscribe(
      data => {
      this.donation = data;
      },
      err => {
        const alerts = this.alertService.jsonToHtmlList(err);
        this.alertService.error(alerts);
      }
      );
  }


}
