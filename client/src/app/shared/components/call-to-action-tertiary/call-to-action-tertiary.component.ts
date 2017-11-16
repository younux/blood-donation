import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-call-to-action-tertiary',
  templateUrl: './call-to-action-tertiary.component.html',
  styleUrls: ['./call-to-action-tertiary.component.scss']
})
export class CallToActionTertiaryComponent implements OnInit {

  @Input() title: string;
  @Input() buttonText: string;
  @Input() routerLinkArray: Array<string>;

  constructor() { }

  ngOnInit() {
  }

}
