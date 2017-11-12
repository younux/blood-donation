import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AuthenticationService} from "../../shared/services/authentication.service";
import {AlertService} from "../../shared/services/alert.service";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-password-reset',
  templateUrl: './password-reset.component.html',
  styleUrls: ['./password-reset.component.scss']
})
export class PasswordResetComponent implements OnInit {

  myForm: FormGroup;
  showSpinner: boolean;
  returnUrl: string;
  key: string = null;
  token: string = null;
  showResetForm: boolean = false;
  verificationMessage: string = "Verification ..";

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
    this.showSpinner = true;
    this.key = this.route.snapshot.params['key'];
    this.token = this.route.snapshot.params['token'];
    if (!this.key || !this.token) {
      this.showSpinner = false;
      this.verificationMessage = "URL de réinitialisation de mot de passe invalide";
    } else {
      this.authenticationService.passwordResetVerify(this.key, this.token).subscribe(
        data => {
          this.showSpinner = false;
          this.showResetForm = true;
        },
        err => {
          this.showSpinner = false;
          this.verificationMessage = "URL de réinitialisation de mot de passe invalide";
          const alerts = this.alertService.jsonToHtmlList(err);
          this.alertService.error(alerts);
        }
      );
    }

  }

  createForm() {
    this.myForm = this.fb.group({
      password: [null, Validators.required],
      }
    );
  }

  onSubmit(passedForm) {
    if (passedForm.valid) {
      this.showSpinner = true;
      this.authenticationService.passwordReset(this.key,
                                                this.token,
                                                passedForm.value.password).subscribe(
          data => {
            this.showSpinner = false;
            this.router.navigate([this.returnUrl]);
            this.alertService.success(`You have succesfully changed your password,
                                        you can log in using your new password`);
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
