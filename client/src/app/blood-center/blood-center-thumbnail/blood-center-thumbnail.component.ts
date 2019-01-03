import {Component, Input, OnInit} from '@angular/core';
import {BloodCenter} from "../../shared/models/blood-center.model";

@Component({
  selector: 'app-blood-center-thumbnail',
  templateUrl: './blood-center-thumbnail.component.html',
  styleUrls: ['./blood-center-thumbnail.component.scss']
})
export class BloodCenterThumbnailComponent implements OnInit {

  @Input() bloodCenter: BloodCenter;

  constructor() { }

  ngOnInit() {
  }

}
