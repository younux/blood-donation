import {
  Component, OnChanges, ElementRef, Input, OnInit, ViewChildren, ViewChild, SimpleChange,
  SimpleChanges
} from '@angular/core';
import {Observable} from "rxjs/Observable";
import 'rxjs/add/observable/fromEvent';


@Component({
  selector: 'app-autocomplete-input',
  templateUrl: './autocomplete-input.component.html',
  styleUrls: ['./autocomplete-input.component.scss']
})
export class AutocompleteInputComponent implements OnInit, OnChanges {
  @Input() initialList: Array<string>;
  @Input() query: string;
  filteredList: Array<string> = new Array<string>();

  constructor() {}

  ngOnInit() {
  }

  ngOnChanges(changes: SimpleChanges) {
    this.query = changes.query.currentValue;
    this.filter();
  }

  filter() {
    if (this.query) {
      this.filteredList = this.initialList.filter(
        elt => (elt.toLowerCase().indexOf(this.query.toLowerCase()) > -1));
    }else {
      this.filteredList = [];
    }
  }

  select(item: string) {
    this.query = item;
    this.filteredList = [];
  }


// See Directives then :
// https://valor-software.com/ngx-bootstrap/#/typeahead
// https://github.com/valor-software/ngx-bootstrap/tree/development/src/typeahead
/*
 Exemple d'utilisation :
<input type="text" class="form-control" name="country" formControlName="country" />
<app-autocomplete-input [query]="myForm.controls['address'].controls['country'].value" [initialList]="countries"></app-autocomplete-input>
*/

}
