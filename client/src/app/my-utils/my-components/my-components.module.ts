import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FieldErrorDisplayComponent} from "./field-error-display/field-error-display.component";
import { AlertDisplayComponent } from './alert-display/alert-display.component';
import { AutocompleteInputComponent } from './autocomplete-input/autocomplete-input.component';
import { DataListComponent } from './data-list/data-list.component';
import { MyTypeaheadContainerComponent } from './my-typeahead-container/my-typeahead-container.component';
import { MyTypeaheadDirective } from './my-typeahead-container/my-typeahead.directive';

@NgModule({
  imports: [
    CommonModule,
  ],
  declarations: [FieldErrorDisplayComponent, AlertDisplayComponent, AutocompleteInputComponent, DataListComponent, MyTypeaheadContainerComponent, MyTypeaheadDirective],
  exports: [FieldErrorDisplayComponent, AlertDisplayComponent, AutocompleteInputComponent, DataListComponent, MyTypeaheadContainerComponent, MyTypeaheadDirective],
})
export class MyComponentsModule { }
