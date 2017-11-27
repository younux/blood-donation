import {Component, Input, OnInit} from '@angular/core';
import {Post} from "../../shared/models/post.model";

@Component({
  selector: 'app-blog-post-box',
  templateUrl: './blog-post-box.component.html',
  styleUrls: ['./blog-post-box.component.scss']
})
export class BlogPostBoxComponent implements OnInit {

  @Input() post: Post;

  constructor() { }

  ngOnInit() {
    // TODO: a temporary default image, until image handling is implemented
    this.post.image = this.post.image || "/assets/images/blog_1.jpg";
  }

}
