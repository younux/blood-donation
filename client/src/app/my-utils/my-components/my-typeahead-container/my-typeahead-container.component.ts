import {Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';

@Component({
  selector: 'app-my-typeahead-container',
  templateUrl: './my-typeahead-container.component.html',
  styleUrls: ['./my-typeahead-container.component.scss']
})
export class MyTypeaheadContainerComponent implements OnInit {

  @Input() itemsList: Array<string>;  // items that the typeahead will show
  @Input() set query(queryValue: string){  // setter for _query that will watch the change of the input query and act
    this._query = queryValue;
    this.filter();
  }
  @Input() containerWidth: number;  // Container width (that sould be given as the width of the input element where the directive is used)
  @Output() selectedItem: EventEmitter<string> = new EventEmitter<string>();  // Output that will emit the selected item
  private _query: string;   // query of the user (word to base on to do the filtering)
  filteredList: Array<string> = new Array<string>();  // Filtred list using query
  activeDim:  HTMLDivElement;  // The active item in the container
  @ViewChild('divList') divList: ElementRef;  // The div that contains the children divs containing filtred list items
  @ViewChild('divWrapper') divWrapper: ElementRef; // The div that wrapps the container, it will be used to adapt the width using containerWidth input

  constructor() {}

  ngOnInit() {
    // Set the container width to the value given as input
    this.divWrapper.nativeElement.style.width = `${this.containerWidth}px`;
  }

  filter() {
    if (this._query) {
      this.filteredList = this.itemsList.filter(
        elt => (elt.toLowerCase().indexOf(this._query.toLowerCase()) > -1));
    }else {
      this.filteredList = [];
    }
  }

  selectClickedItem(event: any) {
    // emit the clicked item and hide the container
    this.selectedItem.emit(event.target.textContent.trim());
    this.hide();
    }

  selectActiveItem() {
    // emit the Active item and hide the container
    if (this.activeDim) {
      this.selectedItem.emit(this.activeDim.textContent.trim());
      this.hide();
    }
  }

  activateHoveredItem(event: any) {
    // Remove CSS active class if we already have an active element
    if (this.activeDim) {
      this.activeDim.classList.remove('active');
    }
    // Get the active element for mouse event
    this.activeDim = event.target;
    // Set active class on this element
    this.activeDim.classList.add('active');
  }

  activateNextItem() {
    // Check if we have already activated an element
    if (this.activeDim) {
      // Remove CSS active class on active element
      this.activeDim.classList.remove('active');
      const currentIndex = this.filteredList.indexOf(this.activeDim.textContent.trim());
      if (currentIndex >= 0 && currentIndex <= (this.filteredList.length - 2)) {
        this.activeDim = this.activeDim.nextSibling as HTMLDivElement;
        this.activeDim.classList.add('active');
        this.divList.nativeElement.scrollTop = this.activeDim.offsetTop;  // Scroll to element
      } else {
        this.activeDim = null;
      }
    } else if (this.filteredList.length > 0) {
      this.activeDim = this.divList.nativeElement.children[0];
      this.activeDim.classList.add('active');
      this.divList.nativeElement.scrollTop = this.activeDim.offsetTop;  // Scroll to element
    }
  }

  activatePreviousItem() {
    // Check if we have already activated an element
    if (this.activeDim) {
      // Remove CSS active class on active element
      this.activeDim.classList.remove('active');
      const currentIndex = this.filteredList.indexOf(this.activeDim.textContent.trim());
      if (currentIndex >= 1 && currentIndex <= (this.filteredList.length - 1)) {
        this.activeDim = this.activeDim.previousSibling as HTMLDivElement;
        this.activeDim.classList.add('active');
        this.divList.nativeElement.scrollTop = this.activeDim.offsetTop;  // Scroll to element
      } else {
        this.activeDim = null;
      }
    } else if (this.filteredList.length > 0) {
      this.activeDim = this.divList.nativeElement.children[this.divList.nativeElement.children.length - 1];
      this.activeDim.classList.add('active');
      this.divList.nativeElement.scrollTop = this.activeDim.offsetTop;  // Scroll to element
    }
  }

  hide() {
    // Set active div to null and filtered list to empty so as to hide the container
    if (this.activeDim) {
      this.activeDim.classList.remove('active');
      this.activeDim = null;
    }
    this.filteredList = [];
  }

}
