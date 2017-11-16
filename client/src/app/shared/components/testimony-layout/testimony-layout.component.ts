import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-testimony-layout',
  templateUrl: './testimony-layout.component.html',
  styleUrls: ['./testimony-layout.component.scss']
})
export class TestimonyLayoutComponent implements OnInit {

  @Input() title: string;
  @Input() content: string;
  @Input() authorName: string;
  @Input() authorStatus: string;

  constructor() { }

  ngOnInit() {
  }

}
