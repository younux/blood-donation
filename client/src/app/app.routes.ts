import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import {DonationComponent} from './donation/donation.component';
import {ProfileRegisterComponent} from "./profile/profile-register/profile-register.component";
import {ProfileLoginComponent} from "./profile/profile-login/profile-login.component";

export const appRoutes: Routes = [
  { path: '' , redirectTo: 'home', pathMatch: 'full'},
  { path: 'home' , component: HomeComponent },
  { path: 'register', component: ProfileRegisterComponent},
  { path: 'login', component: ProfileLoginComponent},
  { path: 'donations', component: DonationComponent },
  { path: '**', redirectTo: 'home'},
];
