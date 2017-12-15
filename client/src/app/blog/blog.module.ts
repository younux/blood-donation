import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';

import {ComponentsModule} from '../shared/components/components.module';

import { BlogService } from '../shared/services/blog.service';

import { SafeHtmlPipe} from '../shared/pipes/safe-html.pipe';

import { EditorModule} from 'primeng/components/editor/editor';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { PaginationModule } from 'ngx-bootstrap/pagination';

import {
  BlogComponent,
  BlogPostThumbnailComponent,
  BlogPostCommentComponent,
  BlogPostAuthorComponent,
  BlogPostBoxComponent,
  BlogPostCommentFormComponent,
  BlogPostListComponent,
  BlogPostDetailComponent,
  BlogPostCommentListComponent,
  BlogPostEditComponent,
} from '.';

const declarations = [
  BlogComponent,
  BlogPostThumbnailComponent,
  BlogPostCommentComponent,
  BlogPostAuthorComponent,
  BlogPostBoxComponent,
  BlogPostCommentFormComponent,
  BlogPostListComponent,
  BlogPostDetailComponent,
  BlogPostCommentListComponent,
  BlogPostEditComponent,
];


@NgModule({
  imports: [
    CommonModule,
    ComponentsModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    PaginationModule.forRoot(),
    EditorModule,
    BsDatepickerModule.forRoot(),
  ],
  declarations: [...declarations, SafeHtmlPipe],
  exports: [...declarations],
  providers: [BlogService],
})
export class BlogModule { }
