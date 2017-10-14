import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { BsDatepickerModule, TimepickerModule } from 'ngx-bootstrap';


import { DonationService } from '../my-utils/my-services/donation.service';
import { MyComponentsModule } from '../my-utils/my-components/my-components.module';

import {
  DonationThumbnailComponent,
  DonationListComponent,
  DonationComponent,
  DonationDetailComponent,
  DonationCreateComponent,
  DonationUpdateComponent,
  DonationListAllComponent,
  DonationListMyComponent
} from '.';

const declarations = [
  DonationThumbnailComponent,
  DonationListComponent,
  DonationComponent,
  DonationDetailComponent,
  DonationCreateComponent,
  DonationUpdateComponent,
  DonationListAllComponent,
  DonationListMyComponent
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    MyComponentsModule,

    BsDatepickerModule.forRoot(),
    TimepickerModule.forRoot()
  ],
  declarations: [...declarations],
  exports: [...declarations],
  providers: [DonationService]
})
export class DonationModule {
}
