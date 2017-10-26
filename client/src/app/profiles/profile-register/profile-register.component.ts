import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {AlertService} from "../../shared/services/alert.service";
import {CustomValidators} from "../../shared/validators/custom-validators.validator";
import {AuthenticationService} from "../../shared/services/authentication.service";


@Component({
  selector: 'app-profile-register',
  templateUrl: './profile-register.component.html',
  styleUrls: ['./profile-register.component.scss']
})
export class ProfileRegisterComponent implements OnInit {
  myForm1: FormGroup;
  myForm2: FormGroup;
  myForm3: FormGroup;
  myForm4: FormGroup;

  isFormSubmitAttempt: boolean;
  returnUrl: string;

  constructor(private fb: FormBuilder,
              private authenticationService: AuthenticationService,
              private alertService: AlertService,
              private route: ActivatedRoute,
              private router: Router) {

    this.createForms();
    this.isFormSubmitAttempt = false;

  }

  ngOnInit() {
  // reset login status
  this.authenticationService.logout();
  // get return url from route parameters or default to '/home'
  this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/home';
  }

  createForms() {
    this.myForm1 = this.fb.group({
        username: [ null, Validators.required],
        email: [ null, [Validators.required, CustomValidators.email]],
        password: [null, Validators.required],
      }
    );
    this.myForm2 = this.fb.group({
        firstName: [ null, Validators.required],
        lastName: [ null, Validators.required],
        birthDate: [ null, Validators.required],
        phoneNumber: [ null, [Validators.required,
          CustomValidators.phoneNumber]],
      }
    );
    this.myForm3 = this.fb.group({
        street: [ null, Validators.required],
        city: [ null, Validators.required],
        country: [ null, Validators.required],
        zipCode: [ null, [Validators.required, CustomValidators.zipCode]],
      }
    );
    this.myForm4 = this.fb.group({
        bloodType: [ null, Validators.required],
        emailNotification: [ null, Validators.required],
        smsNotification: [ null, Validators.required],
      }
    );
  }

  onSubmitForm1(passedForm: FormGroup){

  }

  onSubmitForm2(passedForm: FormGroup){

  }

  onSubmitForm3(passedForm: FormGroup){

  }

  onSubmitForm4(passedForm: FormGroup){

  }

/*
  onSubmit(passedForm) {
    this.isFormSubmitAttempt = true;
    if (passedForm.valid) {
      const sentData = passedForm.value;
      this.authenticationService.register(sentData)
        .subscribe(
          data => {
            this.router.navigate([this.returnUrl]);
            this.alertService.success('You have successfully registered');
          },
          err => {
            const alerts = this.alertService.getAllJsonValues(err);
            this.alertService.error(alerts);
          }
        );
    }
  }
*/

}
