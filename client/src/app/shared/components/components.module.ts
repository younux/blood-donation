import { NgModule } from '@angular/core';
import { MatProgressBarModule } from '@angular/material';

import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { FieldErrorDisplayComponent} from './field-error-display/field-error-display.component';
import { AlertDisplayComponent } from './alert-display/alert-display.component';
import { LoaderComponent } from './loader/loader.component';
import { TypeaheadContainerComponent } from './typeahead-container/typeahead-container.component';
import { TypeaheadDirective } from './typeahead-container/typeahead.directive';
import { PageHeaderComponent } from './page-header/page-header.component';
import { TeamMemberComponent } from './team-member/team-member.component';
import { SectionHeadingComponent } from './section-heading/section-heading.component';




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
                  PageHeaderComponent,
                  TeamMemberComponent,
                  SectionHeadingComponent],
  entryComponents: [TypeaheadContainerComponent],
  exports: [FieldErrorDisplayComponent,
            AlertDisplayComponent,
            LoaderComponent,
            TypeaheadContainerComponent,
            TypeaheadDirective,
            PageHeaderComponent,
            TeamMemberComponent,
            SectionHeadingComponent],

})
export class ComponentsModule { }
