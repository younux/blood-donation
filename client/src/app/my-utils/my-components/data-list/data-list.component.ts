import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-data-list',
  templateUrl: './data-list.component.html',
  styleUrls: ['./data-list.component.scss']
})
export class DataListComponent implements OnInit {

  @Input() initialList: string[];
  @Input() myId: string;

  constructor() { }

  ngOnInit() {
  }

}
