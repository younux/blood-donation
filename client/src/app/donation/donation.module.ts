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
import { BsDatepickerModule } from 'ngx-bootstrap';
import { TimepickerModule } from 'ngx-bootstrap';
import { DonationListAllComponent } from './donation-list-all/donation-list-all.component';
import { DonationListMyComponent } from './donation-list-my/donation-list-my.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    MyUtilsModule,

    BsDatepickerModule.forRoot(),
    TimepickerModule.forRoot(),

  ],
  declarations: [
    DonationThumbnailComponent,
    DonationListComponent,
    DonationComponent,
    DonationDetailComponent,
    DonationCreateComponent,
    DonationUpdateComponent,
    DonationListAllComponent,
    DonationListMyComponent,
  ],
  exports: [
    DonationThumbnailComponent,
    DonationListComponent,
    DonationComponent,
    DonationDetailComponent,
    DonationCreateComponent,
    DonationUpdateComponent,
    DonationListAllComponent,
    DonationListMyComponent,
  ],
  providers: [DonationService],
})
export class DonationModule { }
