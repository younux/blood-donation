import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-my-typeahead-container',
  templateUrl: './my-typeahead-container.component.html',
  styleUrls: ['./my-typeahead-container.component.scss']
})
export class MyTypeaheadContainerComponent implements OnInit {

  @Input() itemsList: Array<string>;
  @Input() set query(queryValue: string){
    this._query = queryValue;
    this.filter();
  }
  private _query: string;
  filteredList: Array<string> = new Array<string>();

  constructor() {}

  ngOnInit() {
  }

  // // Replaced by using set in input()
  // ngOnChanges(changes: SimpleChanges) {
  //   this.query = changes.query.currentValue;
  //   this.filter();
  // }

  filter() {
    if (this._query) {
      this.filteredList = this.itemsList.filter(
        elt => (elt.toLowerCase().indexOf(this._query.toLowerCase()) > -1));
    }else {
      this.filteredList = [];
    }
  }

  select(item: string) {
    this._query = item;
    this.filteredList = [];
  }

}
