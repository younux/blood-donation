import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatProgressBarModule } from '@angular/material';

import { FieldErrorDisplayComponent} from './field-error-display/field-error-display.component';
import { AlertDisplayComponent } from './alert-display/alert-display.component';
import { MyTypeaheadContainerComponent } from './my-typeahead-container/my-typeahead-container.component';
import { MyTypeaheadDirective } from './my-typeahead-container/my-typeahead.directive';
import { LoaderComponent } from './loader/loader.component';



@NgModule({
  imports: [
    CommonModule,
    MatProgressBarModule,
  ],
  declarations: [FieldErrorDisplayComponent, AlertDisplayComponent, MyTypeaheadContainerComponent, MyTypeaheadDirective, LoaderComponent],
  entryComponents: [MyTypeaheadContainerComponent],
  exports: [FieldErrorDisplayComponent, AlertDisplayComponent, MyTypeaheadContainerComponent, MyTypeaheadDirective, LoaderComponent],
})
export class MyComponentsModule { }
