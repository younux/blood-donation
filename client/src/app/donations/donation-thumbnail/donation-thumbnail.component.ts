import { Component, OnInit, Input } from '@angular/core';
import {Donation} from '../../shared/models/donation.model';
@Component({
  selector: 'app-donation-thumbnail',
  templateUrl: './donation-thumbnail.component.html',
  styleUrls: ['./donation-thumbnail.component.scss']
})
export class DonationThumbnailComponent implements OnInit {

  @Input() donation: Donation ;
  @Input() showDetailButton: boolean = false;
  @Input() showUpdateButton: boolean = false;

  constructor() { }

  ngOnInit() {
  }

}
