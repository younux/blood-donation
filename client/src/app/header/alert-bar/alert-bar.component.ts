import {Component, ElementRef, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {AlertService} from "../../shared/services/alert.service";

@Component({
  selector: 'app-alert-bar',
  templateUrl: './alert-bar.component.html',
  styleUrls: ['./alert-bar.component.scss']
})
export class AlertBarComponent implements OnInit {

  @Input() fixed: boolean = false;
  @Input() topFixed: number; // this is a value applied to the alert bar when it is fixed (to make it appear right after
                        // the navbar)
  @Output() onClosed: EventEmitter<boolean> = new EventEmitter<boolean>();
  message: any;



  constructor(private alertService: AlertService,
              public el: ElementRef ) { }

  ngOnInit() {
    this.alertService.getMessage().subscribe( msg => {
      if (msg) {
        this.message = msg;
      } else {
        this.message = null;
      }
    });
  }

  onAlertClosed(){
    this.message = null;
    this.onClosed.emit(true);
  }

}
