import { Component, OnInit } from '@angular/core';
import {Donation} from "../../shared/models/donation.model";
import {DonationService} from "../../shared/services/donation.service";
import {AlertService} from "../../shared/services/alert.service";
import {ActivatedRoute, Router} from "@angular/router";
import {AuthenticationService} from "../../shared/services/authentication.service";
import {Profile} from "../../shared/models/profile.model";

@Component({
  selector: 'app-donation-list-my',
  templateUrl: './donation-list-my.component.html',
  styleUrls: ['./donation-list-my.component.scss']
})
export class DonationListMyComponent implements OnInit {

  myPofile: Profile;
  // donations attributes
  donationsList: Donation[];
  // Pagination attributes
  itemsPerPage: number = 5; // maximum number of items per page. If value less than 1 will display all items on one page
  maxSize: number = 4; // limit number for page links in pager
  totalItems: number; // total number of items in all pages
  currentPage: number; // current selected page
  numPages: number; // equals to total pages count
  // Search and filtering bar attributes
  filteringOptions: any = {};
  orderingOption: string = 'deadline';

  constructor(private route: ActivatedRoute,
              private router: Router,
              private authenticationService: AuthenticationService,
              private donationService: DonationService,
              private alertService: AlertService) {

  }

  ngOnInit() {
    this.myPofile = this.authenticationService.profile;
    // Read query parameters and intialize filtering and ordering options that
    // will be passed to the search bar
    let newFilteringOptions = {};
    let newOrderingOption: string;

    const initQueryParams = this.route.snapshot.queryParams;

    if(initQueryParams) {
      this.currentPage = Number(initQueryParams['page'] || 1);
      newFilteringOptions['city'] = initQueryParams['city'];
      newFilteringOptions['keyWord'] = initQueryParams['keyWord'];
      newOrderingOption = initQueryParams['ordering'] || this.orderingOption;
    }
    // Send list request with a query params string
    this.donationService.listDonations({...initQueryParams, 'username': this.myPofile.username})
      .subscribe(
      response => {
        this.donationsList = response.results;
        this.totalItems = response.count;
      },
      err => {
        const alerts = this.alertService.jsonToHtmlList(err);
        this.alertService.error(alerts);
      });
    // uodate filtering and ordering options that are bind to search
    // bar inputs (this will update the search bar)
    this.filteringOptions = newFilteringOptions;
    this.orderingOption = newOrderingOption;

  }

  onFilteringOptionsChange(options: any) {
    // Change filtering options, request new list and update the route paramaters
    this.filteringOptions = options;
    let routerQueryParams = {};
    // When filtering option change, we go back the first page
    this.currentPage = 1;
    // prepare new query params that will be sent with list request to the server
    if (this.orderingOption) {
      routerQueryParams['ordering'] = this.orderingOption;
    }
    if (this.filteringOptions['city']) {
      routerQueryParams['city'] = this.filteringOptions['city'];
    }
    if (this.filteringOptions['keyWord']) {
      routerQueryParams['keyWord'] = this.filteringOptions['keyWord'];
    }
    // Send list request with a query params string
    this.donationService.listDonations({...routerQueryParams, 'username': this.myPofile.username})
      .subscribe(
      response => {
        this.donationsList = response.results;
        this.totalItems = response.count;
      },
      err => {
        const alerts = this.alertService.jsonToHtmlList(err);
        this.alertService.error(alerts);
      });
    // update route paramters
    this.router.navigate([], {queryParams: routerQueryParams});

  }

  onOrderingOptionChange(option: any) {
    // Change ordering options, request new list and update the route paramaters
    this.orderingOption = option;
    let routerQueryParams = {};
    // When ordering option change, we go back the first page
    this.currentPage = 1;
    // prepare new query params that will be sent with list request to the server
    if (this.orderingOption) {
      routerQueryParams['ordering'] = this.orderingOption;
    }
    if (this.filteringOptions['city']) {
      routerQueryParams['city'] = this.filteringOptions['city'];

    }
    if (this.filteringOptions['keyWord']) {
      routerQueryParams['keyWord'] = this.filteringOptions['keyWord'];

    }
    // Send list request with a query params string
    this.donationService.listDonations({...routerQueryParams, 'username': this.myPofile.username})
      .subscribe(
      response => {
        this.donationsList = response.results;
        this.totalItems = response.count;
      },
      err => {
        const alerts = this.alertService.jsonToHtmlList(err);
        this.alertService.error(alerts);
      });
    // update route paramters
    this.router.navigate([], {queryParams: routerQueryParams});

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
      this.donationService.listDonations({...routerQueryParams, 'username': this.myPofile.username})
        .subscribe(
        response => {
          this.donationsList = response.results;
          this.totalItems = response.count;
        },
        err => {
          const alerts = this.alertService.jsonToHtmlList(err);
          this.alertService.error(alerts);
        });
      // update route paramters
      this.router.navigate([], {queryParams: routerQueryParams});
    }
  }

  onNumPages(numberOfPages: number) {
    this.numPages = numberOfPages;
  }

}

