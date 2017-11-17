import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { CallToAction1Component } from './call-to-action-1/call-to-action-1.component';
import { CallToAction2Component } from './call-to-action-2/call-to-action-2.component';
import { CallToAction3Component } from './call-to-action-3/call-to-action-3.component';
import { ProcessLayoutComponent } from './process-layout/process-layout.component';
import { CounterBlockComponent } from './counter-block/counter-block.component';
import { SponsorBoxComponent } from './sponsor-box/sponsor-box.component';
import { EventBoxComponent } from './event-box/event-box.component';
import { FaqComponent } from './faq/faq.component';
import { BlogPostBoxComponent } from './blog-post-box/blog-post-box.component';
import { BlogPostListComponent } from './blog-post-list/blog-post-list.component';
import { BlogPostComponent } from './blog-post/blog-post.component';
import { ContactUsComponent } from './contact-us/contact-us.component';
import { GalleryItemComponent } from './gallery-item/gallery-item.component';
import { SponsorsSectionComponent } from './sponsors-section/sponsors-section.component';
import { TeamSectionComponent } from './team-section/team-section.component';
import { EventSingleComponent } from './event-single/event-single.component';
import { GallerySectionComponent } from './gallery-section/gallery-section.component';
import { ProcessSectionComponent } from './process-section/process-section.component';
import { PageHeaderComponent} from "./page-header/page-header.component";
import { TeamMemberComponent} from "./team-member/team-member.component";

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
  ],
  declarations: [
    CallToAction1Component,
    CallToAction2Component,
    CallToAction3Component,
    ProcessLayoutComponent,
    CounterBlockComponent,
    SponsorBoxComponent,
    EventBoxComponent,
    FaqComponent,
    BlogPostBoxComponent,
    BlogPostListComponent,
    BlogPostComponent,
    ContactUsComponent,
    GalleryItemComponent,
    SponsorsSectionComponent,
    TeamSectionComponent,
    EventSingleComponent,
    GallerySectionComponent,
    GallerySectionComponent,
    ProcessSectionComponent,
    PageHeaderComponent,
    TeamMemberComponent,
    ],
  entryComponents: [],
  exports: [
    CallToAction1Component,
    CallToAction2Component,
    CallToAction3Component,
    ProcessLayoutComponent,
    CounterBlockComponent,
    SponsorBoxComponent,
    EventBoxComponent,
    FaqComponent,
    BlogPostBoxComponent,
    BlogPostListComponent,
    BlogPostComponent,
    ContactUsComponent,
    GalleryItemComponent,
    SponsorsSectionComponent,
    EventSingleComponent,
    GallerySectionComponent,
    ProcessSectionComponent,
    PageHeaderComponent,
    TeamMemberComponent,
    ],

})
export class TemplateComponentsModule { }
