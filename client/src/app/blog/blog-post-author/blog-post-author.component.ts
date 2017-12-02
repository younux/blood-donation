import {Component, Input, OnInit} from '@angular/core';
import {Author} from "../../shared/models/author.model";

@Component({
  selector: 'app-blog-post-author',
  templateUrl: './blog-post-author.component.html',
  styleUrls: ['./blog-post-author.component.scss']
})
export class BlogPostAuthorComponent implements OnInit {

  @Input() author: Author;

  constructor() { }

  ngOnInit() {
  }

}
