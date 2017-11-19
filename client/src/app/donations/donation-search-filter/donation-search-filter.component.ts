import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";

import 'rxjs/add/operator/debounceTime';

@Component({
  selector: 'app-donation-search-filter',
  templateUrl: './donation-search-filter.component.html',
  styleUrls: ['./donation-search-filter.component.scss']
})
export class DonationSearchFilterComponent implements OnInit {

  // search bar Inputs
  @Input() showCitySearch: boolean = true;
  @Input() showBloodTypeFilter: boolean = true;
  @Input() showKeyWordSearch: boolean = true;
  @Input() showOrderingSelect: boolean = true;
  // count Input
  @Input() bloodTypeCount: any = {};
  // Filtering attributes
  _filteringOptions = {};
  @Input() filteringOptions: any; // to get initial filtering options
  @Output() filteringOptionsChange: EventEmitter<any> = new EventEmitter<any>();
  // Ordering attributes
  _orderingOption: string;
  @Input() orderingOption: string; // // to get initial ordering options
  @Output() orderingOptionChange: EventEmitter<string> = new EventEmitter<string>();
  // form attribute
  myForm: FormGroup;


  constructor(private fb: FormBuilder) {
    // create form
    this.createForm();
  }

  ngOnInit() {
    // initialize search bar
    this.initSearchBar();
    // Watch for Form changes and act accordingly
    this.myForm.valueChanges
      .debounceTime(500) // only once every 500ms
      .subscribe(
        formValue => {
          this.updateFilteringOptions(formValue);
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
    // initialize filtering form values
    this.myForm.controls['city'].setValue(this.filteringOptions['city']);
    this.myForm.controls['keyWord'].setValue(this.filteringOptions['keyWord']);
    if (this.filteringOptions['bloodType']) {
      Object.keys(this.myForm.controls['bloodType'].value).forEach(
        (key: string) => {
          if (this.filteringOptions['bloodType'].includes(key)){
            this.myForm.controls['bloodType'].get(key).setValue(true);
          } else {
            this.myForm.controls['bloodType'].get(key).setValue(false);
          }
        });
    } else {
      Object.keys(this.myForm.controls['bloodType'].value).forEach(
        (key: string) => {
          this.myForm.controls['bloodType'].get(key).setValue(true);
        });
    }
    // initialize ordering value
    this._orderingOption = this.orderingOption;
  }

  updateFilteringOptions(formValue: any) {
    // update filteringOptions use the new form values and emit the new options
    let bloodType: String[] = new Array<string>();
    bloodType = Object.keys(formValue.bloodType).filter(type => formValue.bloodType[type]);
    if (bloodType.length > 0 && bloodType.length < 8) {
      this._filteringOptions['bloodType'] = bloodType;
    } else if (bloodType.length === 8) {
      delete this._filteringOptions['bloodType'];
    } else {
      this._filteringOptions['bloodType'] = ['null'];
    }
    if (this._filteringOptions['city'] !== formValue.city) {
      if (formValue.city && formValue.city.length > 3) {
        this._filteringOptions['city'] = formValue.city;
      } else if (this._filteringOptions['city']) {
        delete this._filteringOptions['city'];
      }
    }
    if (this._filteringOptions['keyWord'] !== formValue.keyWord) {
      if (formValue.keyWord && formValue.keyWord.length > 3) {
        this._filteringOptions['keyWord'] = formValue.keyWord;
      } else if (this._filteringOptions['keyWord']) {
        delete this._filteringOptions['keyWord'];
      }
    }
    // emits the new filtering options
    this.filteringOptionsChange.emit(this._filteringOptions);
  }

  onOrderingOptionChange(option: string) {
    this._orderingOption = option;
    this.orderingOptionChange.emit(this._orderingOption);
  }

}
