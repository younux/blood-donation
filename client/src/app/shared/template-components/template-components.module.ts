import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { CallToAction1Component } from './call-to-action-1/call-to-action-1.component';
import { CallToAction2Component } from './call-to-action-2/call-to-action-2.component';
import { CallToAction3Component } from './call-to-action-3/call-to-action-3.component';
import { ProcessLayoutComponent } from './process-layout/process-layout.component';
import { CounterBlockComponent } from './counter-block/counter-block.component';
import { TestimonyLayoutComponent } from './testimony-layout/testimony-layout.component';
import { TeamMemberComponent } from './team-member/team-member.component';
import { SectionHeadingComponent } from './section-heading/section-heading.component';
import { SponsorBoxComponent } from './sponsor-box/sponsor-box.component';
import { BannerComponent } from './banner/banner.component';
import { PageHeaderComponent } from './page-header/page-header.component';
import { EventBoxComponent } from './event-box/event-box.component';
import { FaqComponent } from './faq/faq.component';
import { Section404Component } from './section-404/section-404.component';
import { BlogPostBoxComponent } from './blog-post-box/blog-post-box.component';
import { BlogPostListComponent } from './blog-post-list/blog-post-list.component';
import { BlogPostComponent } from './blog-post/blog-post.component';
import { ContactUsComponent } from './contact-us/contact-us.component';
import { GalleryItemComponent } from './gallery-item/gallery-item.component';
import { SponsorsSectionComponent } from './sponsors-section/sponsors-section.component';
import { TestimonialSectionComponent } from './testimonial-section/testimonial-section.component';
import { TeamSectionComponent } from './team-section/team-section.component';
import { EventSingleComponent } from './event-single/event-single.component';
import { GallerySectionComponent } from './gallery-section/gallery-section.component';
import { ProcessSectionComponent } from './process-section/process-section.component';

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
    TestimonyLayoutComponent,
    TeamMemberComponent,
    SectionHeadingComponent,
    SponsorBoxComponent,
    BannerComponent,
    PageHeaderComponent,
    EventBoxComponent,
    FaqComponent,
    Section404Component,
    BlogPostBoxComponent,
    BlogPostListComponent,
    BlogPostComponent,
    ContactUsComponent,
    GalleryItemComponent,
    SponsorsSectionComponent,
    TestimonialSectionComponent,
    TeamSectionComponent,
    EventSingleComponent,
    GallerySectionComponent,
    ProcessSectionComponent],
  entryComponents: [],
  exports: [
    CallToAction1Component,
    CallToAction2Component,
    CallToAction3Component,
    ProcessLayoutComponent,
    CounterBlockComponent,
    TestimonyLayoutComponent,
    TeamMemberComponent,
    SectionHeadingComponent,
    SponsorBoxComponent,
    BannerComponent,
    PageHeaderComponent,
    EventBoxComponent,
    FaqComponent,
    Section404Component,
    BlogPostBoxComponent,
    BlogPostListComponent,
    BlogPostComponent,
    ContactUsComponent,
    GalleryItemComponent,
    SponsorsSectionComponent,
    TestimonialSectionComponent,
    TeamSectionComponent,
    EventSingleComponent,
    GallerySectionComponent,
    ProcessSectionComponent],

})
export class TemplateComponentsModule { }
