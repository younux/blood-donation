import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';

import { donationRoutes } from './donation';
import { profileRoutes } from './profile';


export const appRoutes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  ...profileRoutes,
  ...donationRoutes,
  { path: '**', redirectTo: 'home' }
];
