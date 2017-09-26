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
import {ProfileMyComponent} from "./profile/profile-my/profile-my.component";
import {AuthGuardService} from "./my-utils/my-services/auth-guard.service";


export const appRoutes: Routes = [
  { path: '' , redirectTo: 'home', pathMatch: 'full'},
  { path: 'home' , component: HomeComponent },

  { path: 'profiles', component: ProfileComponent,
      children: [
        { path: '', redirectTo: 'login', pathMatch: 'full'},
        { path: 'login' , component : ProfileLoginComponent },
        { path: 'register', component: ProfileRegisterComponent},
        { path: 'my', component: ProfileMyComponent, canActivate: [AuthGuardService]},
      ],
  },

  { path: 'donations', component: DonationComponent,
      children: [
        { path: '', redirectTo: 'all', pathMatch: 'full'},
        { path: 'create', component:  DonationCreateComponent, canActivate: [AuthGuardService]},
        { path: 'all', component: DonationListAllComponent},
        { path: 'my', component: DonationListMyComponent, canActivate: [AuthGuardService]},
        { path: 'detail/:id', component: DonationDetailComponent, canActivate: [AuthGuardService]},
        { path: 'update/:id', component: DonationUpdateComponent, canActivate: [AuthGuardService]},
      ],
  },

  { path: '**', redirectTo: 'home'},
];
