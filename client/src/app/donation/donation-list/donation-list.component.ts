import {Component, OnInit, Input, EventEmitter, Output} from '@angular/core';
import {Donation} from '../../_models/donation.model';

@Component({
  selector: 'app-donation-list',
  templateUrl: './donation-list.component.html',
  styleUrls: ['./donation-list.component.scss']
})
export class DonationListComponent implements OnInit {

  @Input() donations: Donation[];
  @Output() onDonationSelected: EventEmitter<Donation>;
  currentDonation: Donation;

  constructor() {
    this.onDonationSelected = new EventEmitter();
  }

  ngOnInit() {
  }

  clicked(donation: Donation) {
    this.currentDonation = donation;
    this.onDonationSelected.emit(donation);
  }

  isSelected(donation: Donation): boolean {
    if (!donation || !this.currentDonation) {
      return false;
    }
    return donation.id === this.currentDonation.id;
  }
}
