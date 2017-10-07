import {Component, OnDestroy, OnInit} from '@angular/core';
import {LoaderService} from "../../my-services/loader.service";
import {Subscription} from "rxjs/Subscription";

@Component({
  selector: 'app-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.scss']
})
export class LoaderComponent implements OnInit, OnDestroy {

  show: boolean = false;
  private subscription: Subscription;


  constructor(private loaderService: LoaderService) { }

  ngOnInit() {
    this.subscription = this.loaderService.loaderState().subscribe(
      showValue => {
        this.show = showValue;
      }
    )
  }

  ngOnDestroy(){
    this.subscription.unsubscribe();
  }

}
