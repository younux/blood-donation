import {Component, Input, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {DonationService} from "../../shared/services/donation.service";

import 'rxjs/add/operator/debounceTime';
import {AlertService} from "../../shared/services/alert.service";

@Component({
  selector: 'app-donation-search-filter',
  templateUrl: './donation-search-filter.component.html',
  styleUrls: ['./donation-search-filter.component.scss']
})
export class DonationSearchFilterComponent implements OnInit {

  // search bar Inputs
  @Input() showCitySearch: boolean = true;
  @Input() showBloodTypesFilter: boolean = true;
  @Input() showKeyWordSearch: boolean = true;
  @Input() showOrderingSelect: boolean = true;

  myForm: FormGroup;
  donationsCount: any = {};
  orderingOption: string = "deadline"; // default ordering option



  constructor(private fb: FormBuilder,
              private router: Router,
              private route: ActivatedRoute,
              private donationService: DonationService,
              private alertService: AlertService) {
    this.createForm();
  }

  ngOnInit() {
    // initialize search bar with values taken from url query parameters
    this.initSearchBar();
    // Watch for Form changes and act accordingly
    this.myForm.valueChanges
      .debounceTime(500) // only once every 500ms
      .subscribe(
        formValue => {
          // uodate filtering query parameters : updateFilteringQueryParams returns a boolean that indicates if
          // we should update donations count
          if (this.updateFilteringQueryParams(formValue)) {
            if(this.showBloodTypesFilter){
              // Check if the filter is displayed, otherwise it is no use updating count !
              // update donations count
              this.updateDoantionsCount(formValue);
            }
          }
          // foordering query paramters are updated using ngModelChange
        });
  }

  createForm() {
    this.myForm = this.fb.group({
      city: [null],
      bloodType: this.fb.group({
        APlus: [false],
        AMinus: [false],
        BPlus: [false],
        BMinus: [false],
        ABPlus: [false],
        ABMinus: [false],
        OPlus: [false],
        OMinus: [false],
      }),
      keyWord: [null],
    });
  }

  initSearchBar() {
    if(this.showBloodTypesFilter) {
      // Check if the filter is displayed, otherwise it is no use counting !
      // initialize donations count by blood type
      this.donationService.countDonationsByBloodType().subscribe(
        data => {
          this.donationsCount = data;
        },
        err => {
          const alerts = this.alertService.jsonToHtmlList(err);
          this.alertService.error(alerts);
        }
      );
    }
    // initialize the other parts of the search bar
    const queryParameters = this.route.snapshot.queryParams
    // read initial query parameters
    const cityParam = queryParameters['city'];
    const keyWordParam = queryParameters['keyWord'];
    let bloodTypes: String[];
    if (queryParameters['bloodTypes']) {
      bloodTypes = queryParameters['bloodTypes'].split('_');
    }
    const orderingParam = queryParameters['ordering'];
    // initialize form values
    if (cityParam) {
      this.myForm.controls['city'].setValue(cityParam);
    }
    if (keyWordParam) {
      this.myForm.controls['keyWord'].setValue(keyWordParam);
    }
    if (bloodTypes) {
      bloodTypes.forEach((value: string) => {
        this.myForm.controls['bloodType'].get(value).setValue(true);
      });
    } else {
      Object.keys(this.myForm.controls['bloodType'].value).forEach(
        (key: string) => {
          this.myForm.controls['bloodType'].get(key).setValue(true);
        });
    }
    // initialize ordering list
    if (orderingParam) {
      this.orderingOption = orderingParam;
    }
  }

  updateFilteringQueryParams(formValue: any): boolean {
    // this is the returned value that indicates if we should update donations count
    let shouldUpdateDonationsCount: boolean = false;

    // get current filtering query parameters to update it
    let queryParameters = Object.assign({}, this.route.snapshot.queryParams);
    let bloodTypes: String[] = new Array<string>();
    bloodTypes = Object.keys(formValue.bloodType).filter(type => formValue.bloodType[type]);
    if (bloodTypes.length > 0 && bloodTypes.length < 8) {
      queryParameters['bloodTypes'] = bloodTypes.join('_');
    } else if (bloodTypes.length === 8) {
      delete queryParameters['bloodTypes'];
    } else {
      queryParameters['bloodTypes'] = 'null';
    }
    if (queryParameters['city'] !== formValue.city) {
      if (formValue.city && formValue.city.length > 3) {
        queryParameters['city'] = formValue.city;
        shouldUpdateDonationsCount = true;
      } else if (queryParameters['city']) {
        delete queryParameters['city'];
        shouldUpdateDonationsCount = true;
      }
    }
    if (queryParameters['keyWord'] !== formValue.keyWord) {
      if (formValue.keyWord && formValue.keyWord.length > 3) {
        queryParameters['keyWord'] = formValue.keyWord;
        shouldUpdateDonationsCount = true;
      } else if (queryParameters['keyWord']) {
        delete queryParameters['keyWord'];
        shouldUpdateDonationsCount = true;
      }
    }
    // delete page query param if it exists (to request the first page)
    delete queryParameters['page'];
    // Add query parameters to url
    this.router.navigate([], {queryParams: queryParameters});

    return shouldUpdateDonationsCount;
  }

  updateDoantionsCount(formValue: any) {
    let sentQueryParamsArray: String[] = [];

    if (formValue.city && formValue.city.length > 3) {
      sentQueryParamsArray.push(`city=${formValue.city}`);
    }
    if (formValue.keyWord && formValue.keyWord.length > 3) {
      sentQueryParamsArray.push(`keyWord=${formValue.keyWord}`);
    }
    this.donationService.countDonationsByBloodType(sentQueryParamsArray.join('&')).subscribe(
      data => {
        this.donationsCount = data;
      },
      err => {
        const alerts = this.alertService.jsonToHtmlList(err);
        this.alertService.error(alerts);
      }
    );
  }

  onOrderingOptionChange(option: string) {
    this.orderingOption = option;
    this.updateOrderingQueryParams(this.orderingOption);
  }

  updateOrderingQueryParams(orderingOption: string) {
    // get current ordering query parameters to update it
    let queryParameters = Object.assign({}, this.route.snapshot.queryParams);
    queryParameters['ordering'] = orderingOption;
    // delete page query param if it exists (to request the first page)
    delete queryParameters['page'];
    // Add query parameters to url
    this.router.navigate([], {queryParams: queryParameters});
  }

}
