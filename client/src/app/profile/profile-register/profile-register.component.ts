import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-profile-register',
  templateUrl: './profile-register.component.html',
  styleUrls: ['./profile-register.component.scss']
})
export class ProfileRegisterComponent implements OnInit {
  myForm: FormGroup;
  isFormSubmitAttempt: boolean;


  constructor(private fb: FormBuilder) {
    this.createForm();
    this.isFormSubmitAttempt = false;
  }

  ngOnInit() {
  }

  createForm() {
    //TODO : Add good validators add not only built in ones
    this.myForm = this.fb.group({
        username: [ null, Validators.required],
        email: [ null, Validators.compose([Validators.required,
                Validators.email])],
        password: [null, Validators.required],
        firstName: [ null, Validators.required],
        lastName: [ null, Validators.required],
        phoneNumber: [ null, Validators.required],
        street: [ null, Validators.required],
        city: [ null, Validators.required],
        country: [ null, Validators.required],
        zipCode: [ null, Validators.required],
        birthDate: [ null, Validators.required],
        bloodType: [ null, Validators.required],
        emailNotification: [ null, Validators.required],
        smsNotification: [ null, Validators.required],
      }
    );
  }

  onSubmit(passedForm) {
    this.isFormSubmitAttempt = true;
    if (passedForm.valid) {
      console.log('Form valid : you submitted', passedForm.value);
    } else {
      console.log('Form invalid ');
    }
  }

  isFieldInvalid(field: string) {
    return ((!this.myForm.get(field).valid && this.myForm.get(field).touched) ||
    (this.myForm.get(field).untouched && this.isFormSubmitAttempt));
  }

  fieldErrorMessages(field: string) {
    let errorMessages: string[] = new Array<string>();
    if (this.myForm.get(field).hasError('required')) {
      errorMessages.push('This field is required');
    }
    if (this.myForm.get(field).hasError('email')) {
      errorMessages.push('This is not a valid email address');
    }
    return errorMessages;
  }

}





// http://jasonwatmore.com/post/2016/09/29/angular-2-user-registration-and-login-example-tutorial
// http://www.annalytics.co.uk/angular2/javascript/typescript/ionic2/2017/02/26/Angular2-Http-Auth-Interceptor/
// http://jasonwatmore.com/post/2016/08/16/angular-2-jwt-authentication-example-tutorial
// https://angular.io/api/http/Response
// https://blog.thoughtram.io/angular/2016/07/18/guards-in-angular-2.html
