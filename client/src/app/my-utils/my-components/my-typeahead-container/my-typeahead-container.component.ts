import {Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';

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
  @Output() selectedItem: EventEmitter<string> = new EventEmitter<string>();
  private _query: string;
  filteredList: Array<string> = new Array<string>();
  activeDim: ElementRef;
  @ViewChild('divList') divList: ElementRef;

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

  select() {
    if (this.activeDim) {
      this.selectedItem.emit(this.activeDim.nativeElement.textContent.trim());
      this.hide();
    }
  }

  setActiveItem(event: any) {
    // console.log(event.target.textContent.trim());
    if (this.activeDim){
      this.activeDim.nativeElement.removeClass('active');
    }
    this.activeDim = event.target as ElementRef;
    console.log(event.target);
    console.log(this.activeDim);
    this.activeDim.nativeElement.addClass('active');
  }

  activateNextItem() {
    this.activeDim = this.activeDim.nativeElement.nextSibling();
    // const currentIndex = this.filteredList.indexOf(this.activeItem);
    // if (currentIndex >= 0 && currentIndex <= (this.filteredList.length - 2)) {
    //   this.activeItem = this.filteredList[currentIndex + 1];
    // } else {
    //   this.activeItem = this.filteredList[0];
    // }
  }

  activatePreviousItem() {
    this.activeDim = this.activeDim.nativeElement.previousSibling();
    // const currentIndex = this.filteredList.indexOf(this.activeItem);
    // if (currentIndex >= 1 && currentIndex <= (this.filteredList.length - 1)) {
    //   this.activeItem = this.filteredList[currentIndex - 1];
    // } else {
    //   this.activeItem = this.filteredList[this.filteredList.length - 1];
    // }
  }

  hide() {
    this.activeDim = null;
    this.filteredList = [];
  }

  // scroll() {
  //   // console.log(container.nativeElement);
  //   //(item === activeItem) ? (container.offsetTop - 50) : 10
  //   // function updateListSelection(liID) {
  //   //
  //   //   var list = document.getElementById("id Tag Of The <UL> element"),
  //   //     targetLi = document.getElementById(liID); // id tag of the <li> element
  //   //
  //   //   list.scrollTop = (targetLi.offsetTop - 50);
  //   // };
  //   // const delta = this.ulList.nativeElement.getElementsByTagName('li')[0].clientHeight;
  //   // console.log( delta);
  //   // this.ulList.nativeElement.scrollTop = this.ulList.nativeElement.scrollTop  this.ulList.nativeElement.clientHeight / 2 - delta;
  //   // //this.ulList.nativeElement.getElementsByClassName('active')[0].scrollIntoView();
  //
  //
  //   //this.ulList.nativeElement.scrollTop = this.ulList.nativeElement.scrollTop + 20;
  //   //console.log(this.ulList.nativeElement.getElementsByClassName('active')[0]);
  //   //this.elementRef.nativeElement.scrollIntoView(50);
  //
  // }

}
