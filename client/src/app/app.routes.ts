import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import {DonationComponent} from './donation/donation.component';
import {ProfileRegisterComponent} from "./profile/profile-register/profile-register.component";
import {ProfileLoginComponent} from "./profile/profile-login/profile-login.component";
import {DonationCreateComponent} from './donation/donation-create/donation-create.component';
import {DonationDetailComponent} from './donation/donation-detail/donation-detail.component';
import {DonationUpdateComponent} from './donation/donation-update/donation-update.component';
import {DonationListAllComponent} from "./donation/donation-list-all/donation-list-all.component";
import {DonationListMyComponent} from "./donation/donation-list-my/donation-list-my.component";
import {ProfileComponent} from "./profile/profile.component";


export const appRoutes: Routes = [
  { path: '' , redirectTo: 'home', pathMatch: 'full'},
  { path: 'home' , component: HomeComponent },

  { path: 'profiles', component: ProfileComponent,
      children: [
        { path: '', redirectTo: 'login', pathMatch: 'full'},
        { path: 'login' , component : ProfileLoginComponent },
        { path: 'register', component: ProfileRegisterComponent},
      ],
  },

  { path: 'donations', component: DonationComponent,
      children: [
        { path: '', redirectTo: 'all', pathMatch: 'full'},
        { path: 'create', component:  DonationCreateComponent},
        { path: 'all', component: DonationListAllComponent},
        { path: 'my', component: DonationListMyComponent},
        { path: 'detail/:id', component: DonationDetailComponent},
        { path: 'update/:id', component: DonationUpdateComponent},
      ],
  },

  { path: '**', redirectTo: 'home'},
];
