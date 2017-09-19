import {Component, Input, OnInit} from '@angular/core';
import {AbstractControl} from "@angular/forms";

@Component({
  selector: 'app-field-error-display',
  templateUrl: './field-error-display.component.html',
  styleUrls: ['./field-error-display.component.scss']
})
export class FieldErrorDisplayComponent implements OnInit {

  private static readonly errorMessages = {
    'required': () => 'This field is required',
    'email': () => 'This is not a valid email address',
    'minlength': (params) => 'The min number of characters is ' + params.requiredLength,
    'maxlength': (params) => 'The max allowed number of characters is ' + params.requiredLength,
    'pattern': (params) => 'The required pattern is: ' + params.requiredPattern,
  };

  @Input() myControl: AbstractControl;

  constructor() { }

  ngOnInit() {
  }

  shouldShowErrors(): boolean {
    return this.myControl &&
      this.myControl.errors &&
      (this.myControl.dirty || this.myControl.touched);

  }

  listOfErrors(): string[] {
    return Object.keys(this.myControl.errors)
      .map(field => this.getMessage(field, this.myControl.errors[field]));
  }

  private getMessage(type: string, params: any) {
    return FieldErrorDisplayComponent.errorMessages[type](params);
  }

  // isFieldInvalid(field: string) {
  //   return ((!this.myForm.get(field).valid && this.myForm.get(field).touched) ||
  //       (!this.myForm.get(field).valid && this.myForm.get(field).untouched && this.isFormSubmitAttempt));
  // }

}
