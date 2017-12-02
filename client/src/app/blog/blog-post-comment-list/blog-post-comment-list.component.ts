import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Comment} from "../../shared/models/comment.model";

@Component({
  selector: 'app-blog-post-comment-list',
  templateUrl: './blog-post-comment-list.component.html',
  styleUrls: ['./blog-post-comment-list.component.scss']
})
export class BlogPostCommentListComponent implements OnInit {

  @Input() commentsList: Array<Comment>;
  @Input() postSlug: string;
  @Output() replyData = new EventEmitter<any>();
  commentToReplyToId: number;

  constructor() { }

  ngOnInit() {
  }

  onReplyData(replyData: any) {
    this.replyData.emit(replyData);
  }

}
