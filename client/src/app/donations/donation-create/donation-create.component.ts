import { Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {DonationService} from "../../shared/services/donation.service";
import {ActivatedRoute, Router} from "@angular/router";
import {AlertService} from "../../shared/services/alert.service";
import {BsDatepickerConfig} from "ngx-bootstrap/datepicker";

@Component({
  selector: 'app-donation-create',
  templateUrl: './donation-create.component.html',
  styleUrls: ['./donation-create.component.scss'],
})
export class DonationCreateComponent implements OnInit {

  myForm: FormGroup;
  returnUrl: string;
  phoneMask = [/\d/, ' ',  '-', ' ',  /\d/, /\d/, ' ', '-', ' ',
              /\d/, /\d/, ' ',  '-', ' ',  /\d/, /\d/, ' ',  '-', ' ',  /\d/, /\d/];
  unmaskedPhoneNumber: string;
  bsDatePickercolorTheme = 'theme-red';
  bsDatePickerConfig: Partial<BsDatepickerConfig>;

  constructor(private fb: FormBuilder,
              private donationService: DonationService,
              private alertService: AlertService,
              private router: Router,
              private route: ActivatedRoute) {
    this.createForm();

  }

  ngOnInit() {
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/home';
    this.bsDatePickerConfig = Object.assign({}, { containerClass: this.bsDatePickercolorTheme });

  }

  createForm() {
    this.myForm = this.fb.group({
      deadlineDay: [null , Validators.required],
      deadlineTime: [ null , Validators.required],
      description: [null, Validators.required],
      city: [null, Validators.required],
      country: [null, Validators.required],
      countryCode: ['+33'],
      phoneNumber: [ null],
      status: ['Urgent'],
    });

  }

  onSubmit(passedForm: FormGroup) {
    if (passedForm.valid) {
      const deadline = new Date( new Date(passedForm.value.deadlineDay).toDateString() + ' ' +
                          new Date(passedForm.value.deadlineTime).toTimeString()).toISOString();
      this.donationService.createDonation(
        deadline,
        passedForm.value.description,
        passedForm.value.city,
        passedForm.value.country,
        passedForm.value.countryCode + this.unmaskedPhoneNumber,
        passedForm.value.status,
      )
        .subscribe(
          data => {
            this.router.navigate([this.returnUrl]);
            this.alertService.success('You have successfully created donations');
          },
          err => {
            const alerts = this.alertService.jsonToHtmlList(err);
            this.alertService.error(alerts);
          }
        );
    }

  }

}
