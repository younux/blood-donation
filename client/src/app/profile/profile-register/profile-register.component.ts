import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ProfileService} from "../../_services/profile.service";
import {ActivatedRoute, Router} from "@angular/router";
import {AlertService} from "../../_services/alert.service";

@Component({
  selector: 'app-profile-register',
  templateUrl: './profile-register.component.html',
  styleUrls: ['./profile-register.component.scss']
})
export class ProfileRegisterComponent implements OnInit {
  myForm: FormGroup;
  isFormSubmitAttempt: boolean;
  returnUrl: string;


  constructor(private fb: FormBuilder,
              private profileService: ProfileService,
              private alertService: AlertService,
              private route: ActivatedRoute,
              private router: Router) {
    this.createForm();
    this.isFormSubmitAttempt = false;
  }

  ngOnInit() {
  // reset login status
  this.profileService.logout();
  // get return url from route parameters or default to '/home'
  this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/home';
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
        address: this.fb.group({
          street: [ null, Validators.required],
          city: [ null, Validators.required],
          country: [ null, Validators.required],
          zipCode: [ null, Validators.required],
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
      this.profileService.register(sentData)
        .subscribe(
          data => {
            this.router.navigate([this.returnUrl]);
            this.alertService.success(['You have successfully registered']);
          },
          err => {
            const alerts = this.alertService.getAllJsonValues(err);
            this.alertService.error(alerts);
          }
        );
    }
  }

  isFieldInvalid(field: string) {
    return ((!this.myForm.get(field).valid && this.myForm.get(field).touched) ||
    (!this.myForm.get(field).valid && this.myForm.get(field).untouched && this.isFormSubmitAttempt));
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
