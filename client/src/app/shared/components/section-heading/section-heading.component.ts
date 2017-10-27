import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-section-heading',
  templateUrl: './section-heading.component.html',
  styleUrls: ['./section-heading.component.scss']
})
export class SectionHeadingComponent implements OnInit {

  @Input('title') title: string;
  @Input('content') content: string;

  constructor() { }

  ngOnInit() {
  }

}
