import { Component, OnInit } from '@angular/core';
import {AuthenticationService} from "../../shared/services/authentication.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AlertService} from "../../shared/services/alert.service";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-password-reset-request',
  templateUrl: './password-reset-request.component.html',
  styleUrls: ['./password-reset-request.component.scss']
})
export class PasswordResetRequestComponent implements OnInit {

  myForm: FormGroup;
  showSpinner: boolean = false;
  returnUrl: string;

  constructor(private fb: FormBuilder,
              private authenticationService: AuthenticationService,
              private alertService: AlertService,
              private router: Router,
              private route: ActivatedRoute) {
    this.createForm();
  }

  ngOnInit() {
    // get return url from route parameters or default to '/home'
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/home';
  }

  createForm() {
    this.myForm = this.fb.group({
        email: [null, Validators.required],
      }
    );
  }

  onSubmit(passedForm) {
    if (passedForm.valid) {
      this.showSpinner = true;
      this.authenticationService.passwordResetRequest(passedForm.value.email)
        .subscribe(
          data => {
            this.showSpinner = false;
            this.router.navigate([this.returnUrl]);
            this.alertService.success(`Please check the reset password email sent to ${passedForm.value.email}`);
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
