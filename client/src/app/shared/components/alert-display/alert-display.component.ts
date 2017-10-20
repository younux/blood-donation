import { Component, OnInit } from '@angular/core';
import {AlertService} from '../../services/alert.service';


@Component({
  selector: 'app-alert-display',
  templateUrl: './alert-display.component.html',
  styleUrls: ['./alert-display.component.scss']
})
export class AlertDisplayComponent implements OnInit {

  message: any;

  constructor(private alertService: AlertService) { }

  ngOnInit() {
    this.alertService.getMessage().subscribe( message => this.message = message);
  }

}
