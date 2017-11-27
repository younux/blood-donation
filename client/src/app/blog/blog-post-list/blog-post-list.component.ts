import { Component, OnInit } from '@angular/core';
import {BlogService} from "../../shared/services/blog.service";
import {AlertService} from "../../shared/services/alert.service";
import {ActivatedRoute, Router} from "@angular/router";

import {Post} from "../../shared/models/post.model";

@Component({
  selector: 'app-blog-post-list',
  templateUrl: './blog-post-list.component.html',
  styleUrls: ['./blog-post-list.component.scss']
})
export class BlogPostListComponent implements OnInit {

  postsList: Array<Post>;
  // Pagination attributes
  itemsPerPage: number = 5; // maximum number of items per page. If value less than 1 will display all items on one page
  maxSize: number = 4; // limit number for page links in pager
  totalItems: number; // total number of items in all pages
  currentPage: number; // current selected page
  numPages: number; // equals to total pages count

  constructor(private blogService: BlogService,
              private alertService: AlertService) {

  }

  ngOnInit() {
    this.blogService.listPosts().subscribe(
      (response) => {
        this.postsList = response.results;
        this.totalItems = response.count;
      },
      (err) => {
        const alerts = this.alertService.jsonToHtmlList(err);
        this.alertService.error(alerts);
      }
    );

  }

}
