import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FieldErrorDisplayComponent} from './field-error-display/field-error-display.component';
import { AlertDisplayComponent } from './alert-display/alert-display.component';
import { MyTypeaheadContainerComponent } from './my-typeahead-container/my-typeahead-container.component';
import { MyTypeaheadDirective } from './my-typeahead-container/my-typeahead.directive';
import { ScrollToDirective } from './my-typeahead-container/scroll-to.directive';

@NgModule({
  imports: [
    CommonModule,
  ],
  declarations: [FieldErrorDisplayComponent, AlertDisplayComponent, MyTypeaheadContainerComponent, MyTypeaheadDirective, ScrollToDirective],
  entryComponents: [MyTypeaheadContainerComponent],
  exports: [FieldErrorDisplayComponent, AlertDisplayComponent, MyTypeaheadContainerComponent, MyTypeaheadDirective, ScrollToDirective],
})
export class MyComponentsModule { }
