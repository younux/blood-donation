import { Component, ElementRef, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-list-selector',
  templateUrl: './list-selector.component.html',
  styleUrls: ['./list-selector.component.scss'],
  host: {
    '(document:click)': 'onClickOut($event)'
  }
})
export class ListSelectorComponent implements OnInit {
  @Input() title: String;
  @Input() placeholder: String;
  @Input() isActive: boolean;
  @Output() onSelectItem = new EventEmitter<String>();
  items: any;
  isListVisible = false ;
  selectedItem: any;

  constructor(private _elementRef: ElementRef) {
    this.items = [
      'NISSAN',
      'PEUGEOT',
      'CITROEN',
      'VOLKSWAGEN',
      'FORD',
      'BMW',
      'OPEL',
      'MERCEDES',
      'FIAT',
      'TOYOTA',
      'SEAT',
      'ALFA-ROMEO'
    ]
  }

  ngOnInit() {
  }

  selectItem(item: any) {
    this.selectedItem = item;
    this.onSelectItem.emit(item);
  }

  isSelected(item) {
    return this.selectedItem === item;
  }

  toggleList() {
    this.isListVisible = !this.isListVisible;
  }

  hideList() {
    this.isListVisible = false;
  }

  onClickOut(event) {
    if (!this._elementRef.nativeElement.contains(event.target)) {
      this.hideList();
    }
  }

}
