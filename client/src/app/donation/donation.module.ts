import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DonationThumbnailComponent } from './donation-thumbnail/donation-thumbnail.component';
import { DonationListComponent } from './donation-list/donation-list.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [DonationThumbnailComponent, DonationListComponent],
  exports: [DonationThumbnailComponent, DonationListComponent],
})
export class DonationModule { }
