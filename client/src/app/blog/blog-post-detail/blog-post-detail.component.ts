import { Component, OnInit } from '@angular/core';
import {Post} from "../../shared/models/post.model";
import {AlertService} from "../../shared/services/alert.service";
import {BlogService} from "../../shared/services/blog.service";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-blog-post-detail',
  templateUrl: './blog-post-detail.component.html',
  styleUrls: ['./blog-post-detail.component.scss']
})
export class BlogPostDetailComponent implements OnInit {

  post: Post;

  constructor(private blogService: BlogService,
              private alertService: AlertService,
              private route: ActivatedRoute) { }

  ngOnInit() {

    const slug = this.route.snapshot.params['slug'];
    this.blogService.getPost(slug).subscribe(
      (response) => {
        this.post = response;
      },
      (err) => {
        const alerts = this.alertService.jsonToHtmlList(err);
        this.alertService.error(alerts);
      }
    );

  }

}
