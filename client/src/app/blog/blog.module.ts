import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {BlogComponent} from './blog.component';

import { TemplateComponentsModule } from '../shared/template-components/template-components.module';
import { BlogPostThumbnailComponent } from './blog-post-thumbnail/blog-post-thumbnail.component';
import { BlogPostCommentComponent } from './blog-post-comment/blog-post-comment.component';
import { BlogPostAuthorComponent } from './blog-post-author/blog-post-author.component';
import { BlogPostBoxComponent } from './blog-post-box/blog-post-box.component';
import { BlogPostCommentFormComponent } from './blog-post-comment-form/blog-post-comment-form.component';


@NgModule({
  imports: [
    CommonModule,
    TemplateComponentsModule,
  ],
  declarations: [BlogComponent, BlogPostThumbnailComponent, BlogPostCommentComponent, BlogPostAuthorComponent, BlogPostBoxComponent, BlogPostCommentFormComponent],
  exports: [BlogComponent],
  providers: []})
export class BlogModule { }
