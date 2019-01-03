import { Component, OnInit } from '@angular/core';
import {Post} from "../../shared/models/post.model";
import {AlertService} from "../../shared/services/alert.service";
import {BlogService} from "../../shared/services/blog.service";
import {ActivatedRoute} from "@angular/router";
import {AuthenticationService} from "../../shared/services/authentication.service";
import {Author} from "../../shared/models/author.model";
import {BaseComment, Comment} from "../../shared/models/comment.model";

@Component({
  selector: 'app-blog-post-detail',
  templateUrl: './blog-post-detail.component.html',
  styleUrls: ['./blog-post-detail.component.scss']
})
export class BlogPostDetailComponent implements OnInit {

  post: Post;
  isAuthenticated: boolean;


  constructor(private blogService: BlogService,
              private alertService: AlertService,
              private authenticationService: AuthenticationService,
              private route: ActivatedRoute) { }

  ngOnInit() {
    this.isAuthenticated = false;
    this.authenticationService.isAuthenticated().subscribe(
      (isAuthenticatedValue) => {
        this.isAuthenticated = isAuthenticatedValue;
      }
    );

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

  onReplyData(replyData: any){
    this.blogService.createComment(this.post.slug,
                                    replyData.parentId,
                                    replyData.content).subscribe(
      (data) => {
        const baseComment: BaseComment = data;
        for (let comment of this.post.comments){
          if (comment.id === baseComment.parentId) {
            comment.replies.push(baseComment);
            comment.replyCount = comment.replyCount + 1;
            this.post.commentsCount = this.post.commentsCount + 1;
            break;
          }
        }
      },
      (err) => {
        const alerts = this.alertService.jsonToHtmlList(err);
        this.alertService.error(alerts);
      }
    );
  }

  onContentEmitted(content: string){
    this.blogService.createComment(this.post.slug,
      null,
      content).subscribe(
      (data) => {
        const comment: Comment = data;
        this.post.comments.push(comment);
        this.post.commentsCount = this.post.commentsCount + 1;
      },
      (err) => {
        const alerts = this.alertService.jsonToHtmlList(err);
        this.alertService.error(alerts);
      }
    );
  }

}
