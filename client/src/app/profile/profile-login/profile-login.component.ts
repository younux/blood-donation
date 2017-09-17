import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {ProfileService} from "../../_services/profile.service";
import {AlertService} from "../../_services/alert.service";

@Component({
  selector: 'app-profile-login',
  templateUrl: './profile-login.component.html',
  styleUrls: ['./profile-login.component.scss']
})
export class ProfileLoginComponent implements OnInit {

  myForm: FormGroup;
  isFormSubmitAttempt: boolean;
  returnUrl: string;



  constructor(private fb: FormBuilder,
              private profileService: ProfileService,
              private alertService: AlertService,
              private router: Router,
              private route: ActivatedRoute) {
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
      }
    );
  }

  onSubmit(passedForm) {
    this.isFormSubmitAttempt = true;
    if (passedForm.valid) {
      const sentData = passedForm.value;
      this.profileService.login(sentData.username, sentData.email, sentData.password)
        .subscribe(
          data => {
            this.router.navigate([this.returnUrl]);
            this.alertService.success(['You have successfully logged in']);
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


