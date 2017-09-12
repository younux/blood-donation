import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {DonationService} from "../../_services/donation.service";
import {ActivatedRoute, Router} from "@angular/router";
import {AlertService} from "../../_services/alert.service";
import {Donation} from "../../_models/donation.model";

@Component({
  selector: 'app-donation-update',
  templateUrl: './donation-update.component.html',
  styleUrls: ['./donation-update.component.scss']
})
export class DonationUpdateComponent implements OnInit {
  myForm: FormGroup;
  isFormSubmitAttempt: boolean;
  returnUrl: string;
  donationId: number;
  currentDonation: Donation;

  constructor(private fb: FormBuilder,
              private donationService: DonationService,
              private route: ActivatedRoute,
              private router: Router,
              private alertService: AlertService,

              ) {
    this.isFormSubmitAttempt = false;
  }

  ngOnInit() {
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/home';
    this.donationId = this.route.snapshot.params['id'];
    this.donationService.getDonation(this.donationId).subscribe(
      data => {
      this.currentDonation = data;
      console.log('data received : ', this.currentDonation);
      this.createForm();
      },
      err => {
        const alerts = this.alertService.getAllJsonValues(err);
        this.alertService.error(alerts);
      }
    );

  }

  createForm() {
    console.log("convert date : ", (this.currentDonation.deadline).getDay);
    console.log("deadlineDay : ", (this.currentDonation.deadline).toISOString);
    console.log("deadlineTime : ", (this.currentDonation.deadline).toDateString);

    this.myForm = this.fb.group({
      deadlineDay: [this.currentDonation.deadline , Validators.required],
      deadlineTime: [this.currentDonation.deadline , Validators.required],
      description: [this.currentDonation.description, Validators.required],
      city: [this.currentDonation.city, Validators.required],
      phoneNumber: [this.currentDonation.phoneNumber, Validators.required],
      status: [this.currentDonation.status, Validators.required],
    });
  }

  //TODO : there is a problem with the format(type : format) of deadline, it is not taken into account when you changed
  //TODO : from the form interface, so when you submit the change, the deadline does not change
  //TODO : problem with phone number when updated, the first 0 is removed when you submit so it is invalid for server
  onSubmit(passedForm) {
    this.isFormSubmitAttempt = true;
    if (passedForm.valid) {
      const sentData = passedForm.value;
      console.log('data submitted : ', passedForm.value);
      this.donationService
        .updateDonation(this.donationId,
                        passedForm.value.deadline,
                        passedForm.value.description,
                        passedForm.value.city,
                        passedForm.value.phoneNumber,
                        passedForm.value.status,
        ).subscribe(
            data => {
              //this.router.navigate([this.returnUrl]);
              console.log('data received after update : ', data);
              this.alertService.success(['You have successfully updated donation']);
            },
            err => {
              const alerts = this.alertService.getAllJsonValues(err);
              this.alertService.error(alerts);
            }
          );
    }

  }

  deleteDonation(event) {
    this.donationService.deleteDonation(this.donationId).subscribe(
      data => {
        this.router.navigate([this.returnUrl]);
        this.alertService.success(['You have successfully deleted donation']);
      },
      err => {
        const alerts = this.alertService.getAllJsonValues(err);
        this.alertService.error(alerts);
      }
    );

  }

  isFieldInvalid(field: string) {
    return ((!this.myForm.get(field).valid && this.myForm.get(field).touched) ||
    (this.myForm.get(field).untouched && this.isFormSubmitAttempt));
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
