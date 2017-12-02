import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {BaseComment, Comment} from "../../shared/models/comment.model";

@Component({
  selector: 'app-blog-post-comment',
  templateUrl: './blog-post-comment.component.html',
  styleUrls: ['./blog-post-comment.component.scss']
})
export class BlogPostCommentComponent implements OnInit {

  @Input() comment: BaseComment;
  @Input() showCommentForm: boolean = false;
  @Output() commentToReplyTo = new EventEmitter<number>();
  @Output() replyData = new EventEmitter<any>();
  showRequestReplyButton: boolean;

  constructor() { }

  ngOnInit() {
    if (this.comment.parentId) {
      this.showRequestReplyButton = false;
    } else {
      this.showRequestReplyButton = true;
    }
  }

  onClickReply() {
    this.commentToReplyTo.emit(this.comment.id);
  }

  onCancelEmitted(){
    this.commentToReplyTo.emit(null);
  }

  onContentEmited(content: string) {
    const data = {'content': content,
                  'parentId':  this.comment.id};
    this.replyData.emit(data);
    this.commentToReplyTo.emit(null);
  }
}
