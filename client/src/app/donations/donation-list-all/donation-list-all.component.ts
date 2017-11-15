import { Component, OnInit } from '@angular/core';
import { DonationService } from '../../shared/services/donation.service';
import { Donation } from '../../shared/models/donation.model';
import { AlertService } from '../../shared/services/alert.service';
import { ActivatedRoute, Router } from "@angular/router";

@Component({
  selector: 'app-donation-list-all',
  templateUrl: './donation-list-all.component.html',
  styleUrls: ['./donation-list-all.component.scss']
})
export class DonationListAllComponent implements OnInit {

  donationsList: Donation[];

  myText;

  // Pagination attributes
  itemsPerPage: number = 5; // maximum number of items per page. If value less than 1 will display all items on one page
  maxSize: number = 4; // limit number for page links in pager

  totalItems: number; // total number of items in all pages
  currentPage: number; // current selected page
  numPages: number; // equals to total pages count


  constructor(private route: ActivatedRoute,
              private router: Router,
              private donationService: DonationService,
              private alertService: AlertService) {

  }

  ngOnInit() {
    // Init the current page using a snapshot of query parameters
    this.currentPage = Number(this.route.snapshot.queryParams['page'] || 1);
    // subscribing to query parameters to update donations as
    // the queryParams change (using donationService)
    this.route.queryParams.subscribe(
      queryParameters => {
        let sentQueryParamsArray: String[] = [];
        // read query params from url
        const cityParam = queryParameters['city'];
        const keyWordParam = queryParameters['keyWord'];
        const bloodTypesParam = queryParameters['bloodTypes'];
        const page = queryParameters['page'];
        const ordering = queryParameters['ordering'];
        // add non falsy query parrams to sentQueryParamsArray
        if (page) {
          sentQueryParamsArray.push(`page=${page}`);
        } else {
          // in this case, the search bar deleted the page query param to
          // reinitialize the search, so we should return to the first page
          this.currentPage = 1;
        }
        if (ordering) {
          sentQueryParamsArray.push(`ordering=${ordering}`);
        }
        if (cityParam) {
          sentQueryParamsArray.push(`city=${cityParam}`);
        }
        if (keyWordParam) {
          sentQueryParamsArray.push(`keyWord=${keyWordParam}`);
        }
        if (bloodTypesParam) {
          sentQueryParamsArray.push(`bloodTypes=${bloodTypesParam}`);
        }
        // Send list request with a query params string
        this.donationService.listDonations(sentQueryParamsArray.join('&')).subscribe(
          response => {
            this.donationsList = response.results;
            this.totalItems = response.count;
          },
          err => {
            const alerts = this.alertService.jsonToHtmlList(err);
            this.alertService.error(alerts);
          }
        );
      }

    );
  }

  updateCurrentPage(page) {
    this.currentPage = page;
    // get query parameters
    let queryParameters = Object.assign({}, this.route.snapshot.queryParams);
    // check if we need to update url query parameters
    if (!queryParameters['page'] && this.currentPage === 1){
      // here we do not need to update query param
      return;
    } else {
      // update query params
      queryParameters['page'] = this.currentPage
      this.router.navigate([], {queryParams: queryParameters});
    }
  }

  onNumPages(numberOfPages: number){
    this.numPages = numberOfPages;
  }

}
