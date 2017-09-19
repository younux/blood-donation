import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {DonationService} from "../../_services/donation.service";
import {ActivatedRoute, Router} from "@angular/router";
import {AlertService} from "../../_services/alert.service";
import DateTimeFormat = Intl.DateTimeFormat;

@Component({
  selector: 'app-donation-create',
  templateUrl: './donation-create.component.html',
  styleUrls: ['./donation-create.component.scss']
})
export class DonationCreateComponent implements OnInit {

  myForm: FormGroup;
  isFormSubmitAttempt: boolean;
  returnUrl: string;


  constructor(private fb: FormBuilder,
              private donationService: DonationService,
              private alertService: AlertService,
              private router: Router,
              private route: ActivatedRoute) {
    this.createForm();
    this.isFormSubmitAttempt = false;


  }

  ngOnInit() {
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/home';
  }

  createForm() {
    this.myForm = this.fb.group({
      deadlineDay: [null , Validators.required],
      deadlineTime: [ null , Validators.required],
      description: [null, Validators.required],
      city: [null, Validators.required],
      phoneNumber: [null, Validators.required],
      status: [null, Validators.required],
    });

  }

  onSubmit(passedForm) {
    this.isFormSubmitAttempt = true;
    console.log(passedForm.value);
    if (passedForm.valid) {
      const deadline = new Date( new Date(passedForm.value.deadlineDay).toDateString() + ' ' + new Date(passedForm.value.deadlineTime).toTimeString()).toISOString();
      this.donationService.createDonation(deadline,
        passedForm.value.description,
        passedForm.value.city,
        passedForm.value.phoneNumber,
        passedForm.value.status,
      )
        .subscribe(
          data => {
            this.router.navigate([this.returnUrl]);
            this.alertService.success(['You have successfully created donation']);
          },
          err => {
            const alerts = this.alertService.getAllJsonValues(err);
            this.alertService.error(alerts);
          }
        );
    }

  }

}
