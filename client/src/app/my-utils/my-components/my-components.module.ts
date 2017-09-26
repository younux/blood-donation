import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {AlertComponent} from "./alert/alert.component";
import {FieldErrorDisplayComponent} from "./field-error-display/field-error-display.component";

@NgModule({
  imports: [
    CommonModule,
  ],
  declarations: [AlertComponent, FieldErrorDisplayComponent],
  exports: [AlertComponent, FieldErrorDisplayComponent],
})
export class MyComponentsModule { }
