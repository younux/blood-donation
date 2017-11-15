import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";

import 'rxjs/add/operator/debounceTime';
import {el} from "@angular/platform-browser/testing/src/browser_util";

@Component({
  selector: 'app-donation-search-filter',
  templateUrl: './donation-search-filter.component.html',
  styleUrls: ['./donation-search-filter.component.scss']
})
export class DonationSearchFilterComponent implements OnInit {

  myForm: FormGroup;
  orderingOption: string = "deadline"; //default ordering option

  constructor(private fb: FormBuilder,
              private router: Router,
              private route: ActivatedRoute) {
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
        this.updateFilteringQueryParams(formValue);
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

  initSearchBar(){
    const queryParameters = this.route.snapshot.queryParams
    // read initial query parameters
    const cityParam = queryParameters['city'];
    const keyWordParam = queryParameters['keyWord'];
    let bloodTypes: String[];
    if (queryParameters['bloodTypes']){
      bloodTypes = queryParameters['bloodTypes'].split('_');
    }
    const orderingParam = queryParameters['ordering'];
    // initialize form values
    if(cityParam){
      this.myForm.controls['city'].setValue(cityParam);
    }
    if(keyWordParam){
      this.myForm.controls['keyWord'].setValue(keyWordParam);
    }
    if(bloodTypes){
      bloodTypes.forEach( (value: string) => {
        this.myForm.controls['bloodType'].get(value).setValue(true);
      });
    } else {
      Object.keys(this.myForm.controls['bloodType'].value).forEach(
        (key: string) => {
          this.myForm.controls['bloodType'].get(key).setValue(true);
        });
    }
    // initialize ordering list
    if(orderingParam){
      this.orderingOption = orderingParam;
    }
  }

  updateFilteringQueryParams(formValue: any){
    // get current filtering query parameters to update it
    let queryParameters =  Object.assign({}, this.route.snapshot.queryParams);
    let bloodTypes: String[] = new Array<string>();
    bloodTypes = Object.keys(formValue.bloodType).filter( type => formValue.bloodType[type]);
    if (bloodTypes.length > 0 && bloodTypes.length < 8) {
      queryParameters['bloodTypes'] = bloodTypes.join('_');
    } else if(bloodTypes.length === 8) {
      delete queryParameters['bloodTypes'];
    } else {
      queryParameters['bloodTypes'] = 'null';
    }
    if (formValue.city && formValue.city.length > 3) {
      queryParameters['city'] = formValue.city;
    } else {
      delete queryParameters['city'];
    }
    if (formValue.keyWord && formValue.keyWord.length > 3) {
      queryParameters['keyWord'] = formValue.keyWord;
    } else {
      delete queryParameters['keyWord'];
    }
    // delete page query param if it exists (to request the first page)
    delete queryParameters['page'];
    // Add query parameters to url
    this.router.navigate([], {queryParams: queryParameters});
  }

  onOrderingOptionChange(option: string) {
    this.orderingOption = option;
    this.updateOrderingQueryParams(this.orderingOption);
  }

  updateOrderingQueryParams(orderingOption: string){
    // get current ordering query parameters to update it
    let queryParameters =  Object.assign({}, this.route.snapshot.queryParams);
    queryParameters['ordering'] = orderingOption;
    // delete page query param if it exists (to request the first page)
    delete queryParameters['page'];
    // Add query parameters to url
    this.router.navigate([], {queryParams: queryParameters});
  }

}
