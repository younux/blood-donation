import {Component, ElementRef, EventEmitter, HostListener, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-navigation-bar',
  templateUrl: './navigation-bar.component.html',
  styleUrls: ['./navigation-bar.component.scss']
})
export class NavigationBarComponent implements OnInit {

  @Input() fixed: boolean = false; // if it should be fixed in the viewport
  @Output() toggleLeftSideBar: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output() toggleRightSideBar: EventEmitter<boolean> = new EventEmitter<boolean>();


  constructor(public el: ElementRef) { }

  ngOnInit() {
  }

  onMenuIconClick(){
    this.toggleLeftSideBar.emit(true);
  }

  onProfileIconClick(){
    this.toggleRightSideBar.emit(true);
  }

}
