import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DonationThumbnailComponent } from './donation-thumbnail/donation-thumbnail.component';
import { DonationListComponent } from './donation-list/donation-list.component';
import { DonationComponent } from './donation.component';
import { DonationService } from './donation.service';


@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [DonationThumbnailComponent, DonationListComponent, DonationComponent],
  exports: [DonationThumbnailComponent, DonationListComponent, DonationComponent],
  providers: [DonationService],
})
export class DonationModule { }
