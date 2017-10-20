import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {AlertService} from "../../shared/services/alert.service";
import {AuthenticationService} from "../../shared/services/authentication.service";

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
              private authenticationService: AuthenticationService,
              private alertService: AlertService,
              private router: Router,
              private route: ActivatedRoute) {
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
      username: [null],
      email: [null],
      password: [null, Validators.required],
      }
    );
  }

  onSubmit(passedForm) {
    this.isFormSubmitAttempt = true;
    if (passedForm.valid) {
      const sentData = passedForm.value;
      this.authenticationService.login(sentData.username, sentData.email, sentData.password)
        .subscribe(
          data => {
            this.router.navigate([this.returnUrl]);
            this.alertService.success('You have successfully logged in');
          },
          err => {

            const alerts = this.alertService.getAllJsonValues(err);
            this.alertService.error(alerts);
          }
      );
    }
  }

}


