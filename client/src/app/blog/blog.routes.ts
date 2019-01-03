import { Routes } from '@angular/router';

import { AuthGuardService } from '../shared/services/auth-guard.service';
import { ModeratorGuardService } from '../shared/services/moderator-guard.service';

import {BlogComponent} from './blog.component';
import {BlogPostListComponent} from './blog-post-list/blog-post-list.component';
import {BlogPostDetailComponent} from './blog-post-detail/blog-post-detail.component';
import {BlogPostEditComponent} from './blog-post-edit/blog-post-edit.component';

export const blogRoutes: Routes = [
  {
    path: 'blog', component: BlogComponent,
      children: [
        { path: '', redirectTo: 'all', pathMatch: 'full' },
        { path: 'all', component: BlogPostListComponent },
        { path: 'edit', component: BlogPostEditComponent, canActivate: [ModeratorGuardService] },
        { path: 'detail/:slug', component: BlogPostDetailComponent },
      ]
  }
];
