import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DonationThumbnailComponent } from './donation-thumbnail/donation-thumbnail.component';
import { DonationListComponent } from './donation-list/donation-list.component';
import { DonationComponent } from './donation.component';
import { DonationService } from '../_services/donation.service';
import { DonationDetailComponent } from './donation-detail/donation-detail.component';
import { DonationCreateComponent } from './donation-create/donation-create.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {RouterModule} from "@angular/router";
import {MyUtilsModule} from "../_utils/my-utils.module";
import { DonationUpdateComponent } from './donation-update/donation-update.component';
import { DonationDeleteComponent } from './donation-delete/donation-delete.component';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    MyUtilsModule,
  ],
  declarations: [
    DonationThumbnailComponent,
    DonationListComponent,
    DonationComponent,
    DonationDetailComponent,
    DonationCreateComponent,
    DonationUpdateComponent,
    DonationDeleteComponent,
  ],
  exports: [
    DonationThumbnailComponent,
    DonationListComponent,
    DonationComponent,
    DonationDetailComponent,
    DonationCreateComponent,
    DonationUpdateComponent,
    DonationDeleteComponent,
  ],
  providers: [DonationService],
})
export class DonationModule { }
