import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';

import { donationRoutes } from './donations';
import { profileRoutes } from './profiles';


export const appRoutes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  ...profileRoutes,
  ...donationRoutes,
  { path: '**', redirectTo: 'home' }
];
