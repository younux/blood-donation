import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-box-layout',
  templateUrl: './box-layout.component.html',
  styleUrls: ['./box-layout.component.scss']
})
export class BoxLayoutComponent implements OnInit {

  @Input() imgSrc: string = "/assets/images/process_1.jpg";
  @Input() stepNumber: number;
  @Input() title: string;
  @Input() content: string;

  constructor() { }

  ngOnInit() {
  }

}
