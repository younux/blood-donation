import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {AlertService} from "../../my-utils/my-services/alert.service";
import {CustomValidators} from "../../my-utils/my-validators/custom-validators.validator";
import {AuthenticationService} from "../../my-utils/my-services/authentication.service";


@Component({
  selector: 'app-profile-register',
  templateUrl: './profile-register.component.html',
  styleUrls: ['./profile-register.component.scss']
})
export class ProfileRegisterComponent implements OnInit {
  myForm: FormGroup;
  isFormSubmitAttempt: boolean;
  returnUrl: string;
  countries = [ "Albania","Andorra","Armenia","Austria","Azerbaijan","Belarus",
  "Belgium","Bosnia & Herzegovina","Bulgaria","Croatia","Cyprus",
  "Czech Republic","Denmark","Estonia","Finland","France","Georgia",
  "Germany","Greece","Hungary","Iceland","Ireland","Italy","Kosovo",
  "Latvia","Liechtenstein","Lithuania","Luxembourg","Macedonia","Malta",
  "Moldova","Monaco","Montenegro","Netherlands","Norway","Poland",
  "Portugal","Romania","Russia","San Marino","Serbia","Slovakia","Slovenia",
  "Spain","Sweden","Switzerland","Turkey","Ukraine","United Kingdom","Vatican City"];

  constructor(private fb: FormBuilder,
              private authenticationService: AuthenticationService,
              private alertService: AlertService,
              private route: ActivatedRoute,
              private router: Router) {
    this.createForm();
    this.isFormSubmitAttempt = false;
  }

  ngOnInit() {
  // reset login status
  this.authenticationService.logout();
  // get return url from route parameters or default to '/home'
  this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/home';
  }

  createForm() {
    //TODO : Add good validators add not only built in ones
    this.myForm = this.fb.group({
        username: [ null, Validators.required],
        email: [ null, [Validators.required, CustomValidators.email]],
        password: [null, Validators.required],
        firstName: [ null, Validators.required],
        lastName: [ null, Validators.required],
        phoneNumber: [ null, [Validators.required,
                CustomValidators.phoneNumber]],
        address: this.fb.group({
          street: [ null, Validators.required],
          city: [ null, Validators.required],
          country: [ null, Validators.required],
          zipCode: [ null, [Validators.required, CustomValidators.zipCode]],
        }),
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

}
