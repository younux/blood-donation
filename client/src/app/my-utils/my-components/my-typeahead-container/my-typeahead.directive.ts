import {
  ComponentFactoryResolver, Directive, Input, TemplateRef, ViewContainerRef, OnInit,
  ElementRef, ViewChild, ViewChildren
} from '@angular/core';
import {MyTypeaheadContainerComponent} from './my-typeahead-container.component';
import {Observable} from "rxjs/Observable";
import 'rxjs/add/observable/fromEvent';

@Directive({
  selector: '[appMyTypeahead]'
})
export class MyTypeaheadDirective implements OnInit {
  @Input('appMyTypeahead') itemsList: string[];

  constructor(private elementRef: ElementRef,
              private viewContainer: ViewContainerRef,
              private componentFactoryResolver: ComponentFactoryResolver) {

  }

  ngOnInit() {
    // Create a component factory for MyTypeaheadContainerComponent
    const MyTypeaheadContainerComponentFactory =  this.componentFactoryResolver.resolveComponentFactory(MyTypeaheadContainerComponent);
    // Create a component in the view using the factory and ViewContainer.createComponent
    const myTypeaheadContainerComponent = this.viewContainer.createComponent(MyTypeaheadContainerComponentFactory).instance;
    // initialise the itemsList
    myTypeaheadContainerComponent.itemsList = this.itemsList;
    // Watch for keyup events in input and update the typeahead list
    Observable.fromEvent(this.elementRef.nativeElement, 'keyup')
      .map((event: any) => event.target.value)
      .subscribe( value => {
        myTypeaheadContainerComponent.query = value;
    });
  }







}
