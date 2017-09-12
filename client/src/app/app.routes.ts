import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import {DonationComponent} from './donation/donation.component';
import {ProfileRegisterComponent} from "./profile/profile-register/profile-register.component";
import {ProfileLoginComponent} from "./profile/profile-login/profile-login.component";
import {DonationCreateComponent} from './donation/donation-create/donation-create.component';
import {DonationDetailComponent} from './donation/donation-detail/donation-detail.component';
import {DonationUpdateComponent} from './donation/donation-update/donation-update.component';


export const appRoutes: Routes = [
  { path: '' , redirectTo: 'home', pathMatch: 'full'},
  { path: 'home' , component: HomeComponent },
  { path: 'register', component: ProfileRegisterComponent},
  { path: 'login', component: ProfileLoginComponent},
  { path: 'donations', component: DonationComponent },
  { path: 'donations/create', component:  DonationCreateComponent},
  { path: 'donations/update/:id', component:  DonationUpdateComponent},
  { path: 'donations/detail/:id', component:  DonationDetailComponent},


  //{ path: '**', redirectTo: 'home'},
];
