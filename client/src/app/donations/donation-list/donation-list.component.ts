import {Component, OnInit, Input, EventEmitter, Output} from '@angular/core';
import {Donation} from '../../shared/models/donation.model';

@Component({
  selector: 'app-donation-list',
  templateUrl: './donation-list.component.html',
  styleUrls: ['./donation-list.component.scss']
})
export class DonationListComponent implements OnInit {

  @Input() donations: Donation[];
  @Input() showDetailButton: boolean = false;
  @Input() showUpdateButton: boolean = false;

  constructor() {
  }

  ngOnInit() {
  }

}
