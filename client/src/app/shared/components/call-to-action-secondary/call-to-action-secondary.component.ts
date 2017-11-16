import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-call-to-action-secondary',
  templateUrl: './call-to-action-secondary.component.html',
  styleUrls: ['./call-to-action-secondary.component.scss']
})
export class CallToActionSecondaryComponent implements OnInit {

  @Input() title: string;
  @Input() content: string;
  @Input() buttonText: string;
  @Input() routerLinkArray: Array<string>;

  constructor() { }

  ngOnInit() {
  }

}
