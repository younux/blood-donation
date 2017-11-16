import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-call-to-action-primary',
  templateUrl: './call-to-action-primary.component.html',
  styleUrls: ['./call-to-action-primary.component.scss']
})
export class CallToActionPrimaryComponent implements OnInit {

  @Input() title: string;
  @Input() content: string;
  @Input() buttonText: string;
  @Input() routerLinkArray: Array<string>;

  constructor() { }

  ngOnInit() {
  }

}
