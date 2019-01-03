import { Routes } from '@angular/router';

import { AuthGuardService } from '../shared/services/auth-guard.service';


import {
  ProfileComponent,
  ProfileLoginComponent,
  ProfileRegisterComponent,
  ProfileMyComponent,
  ProfileActivateComponent,
  PasswordResetRequestComponent,
  PasswordResetComponent,
} from '.';

export const profileRoutes: Routes = [
  {
    path: 'profiles', component: ProfileComponent,
      children: [
        { path: '', redirectTo: 'login', pathMatch: 'full' },
        { path: 'login', component: ProfileLoginComponent },
        { path: 'register', component: ProfileRegisterComponent },
        { path: 'my', component: ProfileMyComponent, canActivate: [AuthGuardService] },
        { path: 'activate/:key/:token', component: ProfileActivateComponent },
        { path: 'reset-password/request', component: PasswordResetRequestComponent},
        { path: 'reset-password/reset/:key/:token', component: PasswordResetComponent},
      ]
  }
];
