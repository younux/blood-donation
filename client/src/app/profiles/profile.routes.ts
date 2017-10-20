import { Routes } from '@angular/router';

import { AuthGuardService } from '../shared/services/auth-guard.service';


import {
  ProfileComponent,
  ProfileLoginComponent,
  ProfileRegisterComponent,
  ProfileMyComponent
} from '.';

export const profileRoutes: Routes = [
  {
    path: 'profiles', component: ProfileComponent,
    children: [
      { path: '', redirectTo: 'login', pathMatch: 'full' },
      { path: 'login', component: ProfileLoginComponent },
      { path: 'register', component: ProfileRegisterComponent },
      { path: 'my', component: ProfileMyComponent, canActivate: [AuthGuardService] }
    ]
  }
];
