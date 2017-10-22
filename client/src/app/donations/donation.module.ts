import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { BsDatepickerModule, TimepickerModule } from 'ngx-bootstrap';


import { DonationService } from '../shared/services/donation.service';
import { ComponentsModule } from '../shared/components/components.module';

import {
  DonationThumbnailComponent,
  DonationListComponent,
  DonationComponent,
  DonationDetailComponent,
  DonationCreateComponent,
  DonationUpdateComponent,
  DonationListAllComponent,
  DonationListMyComponent,
  DonationSearchFilterComponent
} from '.';

const declarations = [
  DonationThumbnailComponent,
  DonationListComponent,
  DonationComponent,
  DonationDetailComponent,
  DonationCreateComponent,
  DonationUpdateComponent,
  DonationListAllComponent,
  DonationListMyComponent,
  DonationSearchFilterComponent
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    ComponentsModule,

    BsDatepickerModule.forRoot(),
    TimepickerModule.forRoot()
  ],
  declarations: [...declarations],
  exports: [...declarations],
  providers: [DonationService]
})
export class DonationModule {
}
