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
  activeStep: number = 1;
  returnUrl: string;

  constructor(private fb: FormBuilder,
              private authenticationService: AuthenticationService,
              private alertService: AlertService,
              private route: ActivatedRoute,
              private router: Router) {

    this.createForms();

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
      address: this.fb.group({
          street: [ null, Validators.required],
          city: [ null, Validators.required],
          country: [ null, Validators.required],
          zipCode: [ null, [Validators.required, CustomValidators.zipCode]],
      }),
    });
    this.myForm4 = this.fb.group({
        bloodType: [ null, Validators.required],
        emailNotification: [ null, Validators.required],
        smsNotification: [ null, Validators.required],
      }
    );
  }

  nextStep($event){
    if(this.activeStep < 4){
      this.activeStep = this.activeStep + 1;
    }
  }

  previousStep($event){
    if(this.activeStep > 1){
      this.activeStep = this.activeStep -1;
    }
  }

  onSubmitForm(){
    if (this.myForm1.valid && this.myForm2.valid && this.myForm3.valid && this.myForm4.valid) {
      const sentData = Object.assign(this.myForm1.value, this.myForm2.value, this.myForm3.value, this.myForm4.value);
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

/*
  onSubmit(passedForm) {
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
