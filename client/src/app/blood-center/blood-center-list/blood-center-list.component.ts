import { Component, OnInit } from '@angular/core';
import {BloodCenter} from "../../shared/models/blood-center.model";
import {BloodCenterService} from "../../shared/services/blood-center.service";
import {AlertService} from "../../shared/services/alert.service";
import {ActivatedRoute, Router} from "@angular/router";
import {FormBuilder, FormGroup} from "@angular/forms";

import 'rxjs/add/operator/debounceTime';

@Component({
  selector: 'app-blood-center-list',
  templateUrl: './blood-center-list.component.html',
  styleUrls: ['./blood-center-list.component.scss']
})
export class BloodCenterListComponent implements OnInit {

  bloodCenters: Array<BloodCenter> = null;
  // Pagination attributes
  itemsPerPage: number = 10; // maximum number of items per page. If value less than 1 will display all items on one page
  maxSize: number = 4; // limit number for page links in pager
  totalItems: number; // total number of items in all pages
  currentPage: number; // current selected page
  numPages: number; // equals to total pages count
  // Search attributes
  searchForm: FormGroup;
  searchedName: string;


  constructor(private fb: FormBuilder,
              private bloodCenterService: BloodCenterService,
              private alertService: AlertService,
              private router: Router,
              private route: ActivatedRoute) { }

  ngOnInit() {
    this.createSearchForm();
    // read initial query params
    const initialQueryParams = this.route.snapshot.queryParams;
    // init page number in pagination
    this.currentPage = Number(initialQueryParams['page'] || 1);
    // init search values in search form
    this.initSearchForm(initialQueryParams);
    // request blood centers list
    this.bloodCenterService.listBloodCenters(initialQueryParams).subscribe(
      (data) => {
        this.totalItems = data.count;
        this.bloodCenters = data.results;
      },
      (err) => {
        this.alertService.error(this.alertService.jsonToHtmlList(err));
      }
    );
    // Watch for Form changes and act accordingly
    this.searchForm.valueChanges
      .debounceTime(500) // only every 500ms
      .subscribe( formValue => {
        this.updateBloodCentersList(formValue);
      });
  }

  createSearchForm() {
    this.searchForm = this.fb.group({
      name: [null],
      city: [null],
      country: [null],
      zipCode: [null],
    });
  }

  initSearchForm(queryParams: any) {
    if (queryParams) {
      this.searchForm.controls['name'].setValue(queryParams['name']);
      this.searchForm.controls['city'].setValue(queryParams['city']);
      this.searchForm.controls['country'].setValue(queryParams['country']);
      this.searchForm.controls['zipCode'].setValue(queryParams['zipCode']);
    }
  }

  updateCurrentPage(page) {
    this.currentPage = page;
    // get query parameters
    let routerQueryParams = Object.assign({}, this.route.snapshot.queryParams);
    // check if we need to update url query parameters
    if (!routerQueryParams['page'] && this.currentPage === 1){
      // here we do not need to update query param
      return;
    } else {
      // update page query params
      routerQueryParams['page'] = this.currentPage
      // Send list request with a query params string
      this.bloodCenterService.listBloodCenters(routerQueryParams).subscribe(
        (data) => {
          this.bloodCenters = data.results;
          this.totalItems = data.count;
        },
        (err) => {
          this.alertService.error(this.alertService.jsonToHtmlList(err));
        });
      // update route paramters
      this.router.navigate([], {queryParams: routerQueryParams});
    }
  }

  onNumPages(numberOfPages: number) {
    this.numPages = numberOfPages;
  }

  updateBloodCentersList(formValue : any){
    let routeQueryParams = {};
    // When filtering option change, we go back the first page
    this.currentPage = 1;
    // Add form values to route query parameters object
    if(formValue){
      if(formValue.name){
        routeQueryParams['name'] = formValue.name;
      }
      if(formValue.city){
        routeQueryParams['city'] = formValue.city;
      }
      if(formValue.country){
        routeQueryParams['country'] = formValue.country;
      }
      if(formValue.zipCode){
        routeQueryParams['zipCode'] = formValue.zipCode;
      }
    }
    this.bloodCenterService.listBloodCenters(formValue).subscribe(
      (data) => {
        this.bloodCenters = data.results;
        this.totalItems = data.count;
      },
      (err) => {
        this.alertService.error(this.alertService.jsonToHtmlList(err));
      });
    // update route query parameters
    this.router.navigate([], {queryParams: routeQueryParams});
  }

}
