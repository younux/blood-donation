import { Routes } from '@angular/router';

import { AuthGuardService } from '../shared/services/auth-guard.service';

import {BlogComponent} from './blog.component';


export const blogRoutes: Routes = [
  {
    path: 'blogs', component: BlogComponent,
    children: [
      { path: '', redirectTo: 'all', pathMatch: 'full' },
      { path: 'all', component: BlogComponent },
    ]
  }
];
