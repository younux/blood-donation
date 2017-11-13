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
  myForm5: FormGroup;
  activeStep: number = 1;
  returnUrl: string;
  phoneMask = ['(', '+', '3', '3', ')', '-', /\d/, '-', /\d/, /\d/,
    '-', /\d/, /\d/, '-', /\d/, /\d/, '-', /\d/, /\d/];
  showSpinner: boolean = false;
  isVerifSmsSent: boolean = false;
  isPhoneNumVerified: boolean = false;

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
        phoneNumber: [ null, [Validators.required]],
        code: [ null, Validators.required],
        }
    );

    this.myForm3 = this.fb.group({
        firstName: [ null, Validators.required],
        lastName: [ null, Validators.required],
        gender: [ null, Validators.required],
        birthDate: [ null, Validators.required],
      }
    );

    this.myForm4 = this.fb.group({
      address: this.fb.group({
          street: [ null, Validators.required],
          city: [ null, Validators.required],
          country: [ null, Validators.required],
          zipCode: [ null, [Validators.required, CustomValidators.zipCode]],
      }),
    });
    this.myForm5 = this.fb.group({
        bloodType: [ null, Validators.required],
        emailNotification: [ null, Validators.required],
        smsNotification: [ null, Validators.required],
      }
    );
  }

  nextStep($event){
    if(this.activeStep < 5){
      this.activeStep = this.activeStep + 1;
    }
  }

  previousStep($event){
    if(this.activeStep > 1){
      this.activeStep = this.activeStep - 1;
    }
  }

  // send phone verification sms
  sendVerificationSMS(event: any) {
    // because phoneNumber may be disabled we should use getRawValue
    // when a control is disabled, we no longer can get the value using .value
    const phoneNumber = this.myForm2.getRawValue().phoneNumber;
    if (phoneNumber) {
      this.showSpinner = true;
      this.authenticationService.phoneCodeRequest(phoneNumber).subscribe(
        data => {
          this.myForm2.controls['phoneNumber'].disable();
          this.showSpinner = false;
          this.isVerifSmsSent = true;
          this.alertService.success(`Verification code sent to ${phoneNumber}.
                                   Enter the code in the input bellow`);
        },
        err => {
          this.showSpinner = false;
          const alerts = this.alertService.jsonToHtmlList(err);
          this.alertService.error(alerts);
        }
      );
    }
  }

  // enable phone number input to let the user enter new phone number
  changePhoneNumber(event: any) {
    this.myForm2.controls['phoneNumber'].enable();
    this.isVerifSmsSent = false;
  }

  // verify the code that the user enters so as to verify his phone number
  verifyCode(event: any) {
    // because phoneNumber is disabled we should user getRawValue
    // when disabled, we no longer can get the value using .value
    const phoneNumber = this.myForm2.getRawValue().phoneNumber;
    const code = this.myForm2.value.code;
    if (code) {
      this.showSpinner = true;
      this.authenticationService.phoneVerify(phoneNumber, code).subscribe(
        data => {
          this.showSpinner = false;
          this.isPhoneNumVerified = true;
          this.alertService.success(`You have succefully verified your phone number :
                                   ${phoneNumber}`);
        },
        err => {
          this.showSpinner = false;
          const alerts = this.alertService.jsonToHtmlList(err);
          this.alertService.error(alerts);
        }
      );
    }

  }

  onSubmitForm() {
    if (this.myForm1.valid && this.myForm2.valid && this.myForm3.valid
                                                  && this.myForm4.valid && this.myForm5.valid ) {
      this.showSpinner = true;
      this.authenticationService.register(this.myForm1.value.username,
                              this.myForm1.value.email,
                              this.myForm1.value.password,
                              this.myForm3.value.firstName,
                              this.myForm3.value.lastName,
                              this.myForm3.value.gender,
                              this.myForm2.getRawValue().phoneNumber, // getRawValue because the control is disabled
                              this.myForm4.value.address.street,
                              this.myForm4.value.address.city,
                              this.myForm4.value.address.country,
                              this.myForm4.value.address.zipCode,
                              this.myForm3.value.birthDate,
                              this.myForm5.value.bloodType,
                              this.myForm5.value.emailNotification,
                              this.myForm5.value.smsNotification).subscribe(
          data => {
            this.showSpinner = false;
            this.router.navigate([this.returnUrl]);
            this.alertService.success(`You have successfully registered,
              Please login to your email (${this.myForm1.value.email})
              and click on the activation URL to start using your account`);
          },
          err => {
            this.showSpinner = false;
            const alerts = this.alertService.jsonToHtmlList(err);
            this.alertService.error(alerts);
          }
        );
    }
  }

}
