import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';


import { EventBoxComponent } from './event-box/event-box.component';
import { BlogPostComponent } from './blog-post/blog-post.component';
import { EventSingleComponent } from './event-single/event-single.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
  ],
  declarations: [
    EventBoxComponent,
    BlogPostComponent,
    EventSingleComponent,
    ],
  entryComponents: [],
  exports: [
    EventBoxComponent,
    BlogPostComponent,
    EventSingleComponent,
    ],

})
export class TemplateComponentsModule { }
