import {Component, EventEmitter, OnInit, Input, Output} from '@angular/core';
// http://jasonwatmore.com/post/2016/08/23/angular-2-pagination-example-with-logic-like-google

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss']
})
export class PaginationComponent implements OnInit {

  @Input() totalItems: number;
  @Input() currentPage: number = 1;
  @Input() itemsPerPage: number = 10;
  @Input() maxSize: number = 10;

  @Output() newPage: EventEmitter<number> = new EventEmitter();
  // pager object
  pager: any = {};


  constructor() {
  }

  ngOnInit() {
    this.setPage(this.currentPage);
  }

  setPage(page: number) {
    if (page < 1 || page > this.pager.totalPages) {
      return;
    }
    this.currentPage = page;
    // get pager object
    this.pager = this.getPager(this.totalItems, this.currentPage, this.itemsPerPage, this.maxSize);
    this.newPage.emit(page);
  }


  getPager(totalItems: number, currentPage: number, itemsPerPage: number, maxSize: number) {
    let totalPages = Math.ceil(totalItems / itemsPerPage);
    let startPage: number;
    let endPage: number;
    if (totalPages <= maxSize) {
      // less than maxSize total pages so show all
      startPage = 1;
      endPage = totalPages;
    } else {
      // more than maxSize total pages so calculate start and end pages
      if (currentPage <= Math.ceil(maxSize / 2) + 1) {
        startPage = 1;
        endPage = maxSize;
      } else if ((currentPage + Math.ceil(maxSize / 2) - 1) >= totalPages) {
        startPage = totalPages - (maxSize - 1);
        endPage = totalPages;
      } else {
        startPage = currentPage - Math.ceil(maxSize / 2);
        endPage = currentPage + (Math.ceil(maxSize / 2) - 1);
      }
    }
    // create an array of pages to ng-repeat in the pager control
    const pages = this.range(startPage, endPage + 1);

    // return object with all pager properties required by the view
    return {
      currentPage: currentPage,
      totalPages: totalPages,
      startPage: startPage,
      endPage: endPage,
      pages: pages
    };
  }

  range (start: number, end: number) {
    let rangeArray = Array<number>();
    for (let i: number = start; i < end; i++) {
      rangeArray[i - start] = i;
    }
    return rangeArray;
  }


}
