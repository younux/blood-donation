import { NgModule } from '@angular/core';
import { MatProgressBarModule } from '@angular/material';

import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { FieldErrorDisplayComponent} from './field-error-display/field-error-display.component';
import { AlertDisplayComponent } from './alert-display/alert-display.component';
import { LoaderComponent } from './loader/loader.component';
import { TypeaheadContainerComponent } from './typeahead-container/typeahead-container.component';
import { TypeaheadDirective } from './typeahead-container/typeahead.directive';
import { TeamMemberComponent } from './team-member/team-member.component';
import { SectionHeadingComponent } from './section-heading/section-heading.component';
import { InputMaskDirective } from './input-mask/input-mask.directive';
import { SpinnerComponent } from './spinner/spinner.component';
import { BannerComponent } from './banner/banner.component';
import { CallToActionPrimaryComponent } from './call-to-action-primary/call-to-action-primary.component';
import { CallToActionSecondaryComponent } from './call-to-action-secondary/call-to-action-secondary.component';
import { CallToActionTertiaryComponent } from './call-to-action-tertiary/call-to-action-tertiary.component';
import { BoxLayoutComponent } from './box-layout/box-layout.component';
import { TestimonyLayoutComponent } from './testimony-layout/testimony-layout.component';
import { Section404Component } from './section-404/section-404.component';




@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    MatProgressBarModule,
  ],
  declarations: [FieldErrorDisplayComponent,
                  AlertDisplayComponent,
                  LoaderComponent,
                  TypeaheadContainerComponent,
                  TypeaheadDirective,
                  TeamMemberComponent,
                  SectionHeadingComponent,
                  InputMaskDirective,
                  SpinnerComponent,
                  BannerComponent,
                  CallToActionPrimaryComponent,
                  CallToActionSecondaryComponent,
                  CallToActionTertiaryComponent,
                  BoxLayoutComponent,
                  TestimonyLayoutComponent,
                  Section404Component],
  entryComponents: [TypeaheadContainerComponent],
  exports: [FieldErrorDisplayComponent,
            AlertDisplayComponent,
            LoaderComponent,
            TypeaheadContainerComponent,
            TypeaheadDirective,
            TeamMemberComponent,
            SectionHeadingComponent,
            InputMaskDirective,
            SpinnerComponent,
            BannerComponent,
            CallToActionPrimaryComponent,
            CallToActionSecondaryComponent,
            CallToActionTertiaryComponent,
            BoxLayoutComponent,
            TestimonyLayoutComponent,
            Section404Component],

})
export class ComponentsModule { }
