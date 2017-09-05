import { Component, OnInit } from '@angular/core';
import {DonationService} from "./donation.service";
import {Donation} from "./donation.model";

@Component({
  selector: 'app-donation',
  templateUrl: './donation.component.html',
  styleUrls: ['./donation.component.scss']
})
export class DonationComponent implements OnInit {

  donationsList: Donation[];

  constructor(private donationService: DonationService) { }

  ngOnInit() {
    this.donationService.list().subscribe( response => {
      this.donationsList = response.results;
      console.log(this.donationsList);
      }

    );
  }

  onDonationSelected(donation: Donation) {
    console.log('selected donation : ' + donation.id);
  }

}
