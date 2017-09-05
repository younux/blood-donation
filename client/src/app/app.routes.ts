import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import {DonationComponent} from './donation/donation.component';

export const appRoutes: Routes = [
  { path: '' , component: HomeComponent },
  { path: 'donations', component: DonationComponent },
];
