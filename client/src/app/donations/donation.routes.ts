import { Routes } from '@angular/router';

import { AuthGuardService } from '../shared/services/auth-guard.service';

import {
  DonationComponent,
  DonationCreateComponent,
  DonationListAllComponent,
  DonationListMyComponent,
  DonationDetailComponent,
  DonationUpdateComponent
} from '.';


export const donationRoutes: Routes = [
  {
    path: 'donations', component: DonationComponent,
    children: [
      { path: '', redirectTo: 'all', pathMatch: 'full' },
      { path: 'all', component: DonationListAllComponent },
      { path: 'create', component: DonationCreateComponent, canActivate: [AuthGuardService] },
      { path: 'update/:id', component: DonationUpdateComponent, canActivate: [AuthGuardService] },
      { path: 'my', component: DonationListMyComponent, canActivate: [AuthGuardService] },
      { path: 'detail/:id', component: DonationDetailComponent, canActivate: [AuthGuardService] }
    ]
  }
];
