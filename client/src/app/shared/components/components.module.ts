import { NgModule } from '@angular/core';

import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { FieldErrorDisplayComponent} from './field-error-display/field-error-display.component';
import { AlertDisplayComponent } from './alert-display/alert-display.component';
import { LoaderComponent } from './loader/loader.component';
import { TypeaheadContainerComponent } from './typeahead-container/typeahead-container.component';
import { TypeaheadDirective } from './typeahead-container/typeahead.directive';




@NgModule({
  imports: [
    CommonModule,
    RouterModule,
  ],
  declarations: [FieldErrorDisplayComponent,
                  AlertDisplayComponent,
                  LoaderComponent,
                  TypeaheadContainerComponent,
                  TypeaheadDirective],
  entryComponents: [TypeaheadContainerComponent],
  exports: [FieldErrorDisplayComponent,
            AlertDisplayComponent,
            LoaderComponent,
            TypeaheadContainerComponent,
            TypeaheadDirective,
            ],


})
export class ComponentsModule { }
