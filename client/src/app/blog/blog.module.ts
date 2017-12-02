import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { BlogService } from '../shared/services/blog.service';

import {BlogComponent} from './blog.component';

import { BlogPostThumbnailComponent } from './blog-post-thumbnail/blog-post-thumbnail.component';
import { BlogPostCommentComponent } from './blog-post-comment/blog-post-comment.component';
import { BlogPostAuthorComponent } from './blog-post-author/blog-post-author.component';
import { BlogPostBoxComponent } from './blog-post-box/blog-post-box.component';
import { BlogPostCommentFormComponent } from './blog-post-comment-form/blog-post-comment-form.component';
import { BlogPostListComponent } from './blog-post-list/blog-post-list.component';
import { BlogPostDetailComponent } from './blog-post-detail/blog-post-detail.component';


import {ComponentsModule} from '../shared/components/components.module';
import { BlogPostCommentListComponent } from './blog-post-comment-list/blog-post-comment-list.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";

import { PaginationModule } from 'ngx-bootstrap/pagination';

@NgModule({
  imports: [
    CommonModule,
    ComponentsModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    PaginationModule.forRoot(),
  ],
  declarations: [BlogComponent, BlogPostThumbnailComponent, BlogPostCommentComponent, BlogPostAuthorComponent, BlogPostBoxComponent, BlogPostCommentFormComponent, BlogPostListComponent, BlogPostDetailComponent, BlogPostCommentListComponent],
  exports: [BlogComponent],
  providers: [BlogService],
})
export class BlogModule { }
