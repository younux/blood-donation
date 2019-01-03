import {
  Component, ElementRef, EventEmitter, HostListener, Inject, OnInit, Output, Renderer2,
  ViewChild
} from '@angular/core';
import {WindowRefService} from "../shared/services/window-ref.service";
import {NavigationBarComponent} from "./navigation-bar/navigation-bar.component";
import {TopBarComponent} from "./top-bar/top-bar.component";
import {AlertBarComponent} from "./alert-bar/alert-bar.component";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  @Output() toggleLeftSideBar: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output() toggleRightSideBar: EventEmitter<boolean> = new EventEmitter<boolean>();

  @ViewChild('topBar') topBar: TopBarComponent;
  @ViewChild('navigationBar') navigationBar: NavigationBarComponent;
  @ViewChild('alertBar') alertBar: AlertBarComponent;

  fixed: boolean = false;
  navigationBarHeight: number;
  alertBarHeight: number;



  constructor(private windowRef: WindowRefService) { }

  ngOnInit() {
  }

  @HostListener('window:scroll', []) onWindowScroll() {
    if (this.navigationBar.el.nativeElement.offsetTop < this.windowRef.scrollY()){
      if(!this.fixed){
        this.navigationBarHeight = this.navigationBar.el.nativeElement.getBoundingClientRect().height;
      }
      if(!this.fixed){
        this.alertBarHeight = this.alertBar.el.nativeElement.getBoundingClientRect().height;
      }
      this.fixed = true;
    } else {
      this.fixed = false;
    }
  }

  onAlertClosed(count: number){
    this.alertBarHeight = this.alertBar.el.nativeElement.getBoundingClientRect().height;
  }

  onToggleLeftSideBar(){
    this.toggleLeftSideBar.emit(true);
  }

  onToggleRightSideBar(){
    this.toggleRightSideBar.emit(true);
  }

}
