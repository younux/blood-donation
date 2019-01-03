import {Routes} from '@angular/router';
import { AuthGuardService } from '../shared/services/auth-guard.service';
import { ModeratorGuardService } from '../shared/services/moderator-guard.service';


import {
  BloodCenterComponent,
  BloodCenterCreateComponent,
  BloodCenterDashboardComponent,
  BloodCenterThumbnailComponent,
  BloodCenterDetailComponent,
  BloodCenterListComponent,
  BloodCenterUpdateComponent,
} from '.';


export const bloodCenterRoutes: Routes = [
  {
    path: 'blood-centers', component: BloodCenterComponent,
      children: [
        { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
        { path: 'dashboard', component: BloodCenterDashboardComponent, canActivate: [ModeratorGuardService] },
        { path: 'create', component: BloodCenterCreateComponent, canActivate: [ModeratorGuardService]},
        { path: 'all', component: BloodCenterListComponent, canActivate: [ModeratorGuardService]},
        { path: 'detail/:id', component: BloodCenterDetailComponent, canActivate: [AuthGuardService]},
        { path: 'update/:id', component: BloodCenterUpdateComponent, canActivate: [ModeratorGuardService]},
      ]
  }
];
