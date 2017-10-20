import {
  ComponentFactoryResolver, Directive, Input, TemplateRef, ViewContainerRef, OnInit,
  ElementRef, ViewChild, ViewChildren, HostBinding, HostListener
} from '@angular/core';
import {TypeaheadContainerComponent} from './typeahead-container.component';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/observable/fromEvent';

@Directive({
  selector: '[appTypeahead]'
})
export class TypeaheadDirective implements OnInit {

  @Input('appTypeahead') itemsList: string[];  // Input list that contains element to put in the container
  typeaheadContainerComponent: TypeaheadContainerComponent;  // MyTypeaheadContainerComponent variable that will the created one

  constructor(private elementRef: ElementRef,
              private viewContainer: ViewContainerRef,
              private componentFactoryResolver: ComponentFactoryResolver) {

  }

  ngOnInit() {
    // Create a component factory for MyTypeaheadContainerComponent
    const typeaheadContainerComponentFactory =  this.componentFactoryResolver.resolveComponentFactory(TypeaheadContainerComponent);
    // Create a component in the view using the factory and ViewContainer.createComponent
    this.typeaheadContainerComponent = this.viewContainer.createComponent(typeaheadContainerComponentFactory).instance;
    // initialise the itemsList
    this.typeaheadContainerComponent.itemsList = this.itemsList;
    // Set container width input to the input width (that will be used inside the component)
    this.typeaheadContainerComponent.containerWidth = this.elementRef.nativeElement.offsetWidth;
    // Subscribe to selectedItem output and set input value when a selectedItem is emitted
    this.typeaheadContainerComponent.selectedItem.subscribe(
      selectedItem => {
        this.elementRef.nativeElement.value = selectedItem;
      }
    )
  }

  // Disable browser autocompletion by setting host attribute autocomplete='off'
  @HostBinding('attr.autocomplete') autocomplete = 'off';

  // Watch for keyup events in input and update the typeahead list
  @HostListener('keyup', ['$event']) onChange(e: any): void {
    if (this.typeaheadContainerComponent) {
      // esc
      if (e.keyCode === 27) {
        // hide the suggestions / container
        this.typeaheadContainerComponent.hide();
        return;
      }
      // up
      if (e.keyCode === 38) {
        // go to previous item
        this.typeaheadContainerComponent.activatePreviousItem();
        // this.myTypeaheadContainerComponent.scroll();
        return;
      }
      // down
      if (e.keyCode === 40) {
        // go to next item
        this.typeaheadContainerComponent.activateNextItem();
        // this.myTypeaheadContainerComponent.scroll();
        return;
      }
      // enter
      if (e.keyCode === 13) {
        // slect the active item
        this.typeaheadContainerComponent.selectActiveItem();
        return;
      }
    }
    const value = e.target.value;
    if (value) {
      this.typeaheadContainerComponent.query = value;
    }else {
      this.typeaheadContainerComponent.hide();
    }
  }

// see ngx bootstrap typeahead : https://github.com/valor-software/ngx-bootstrap/blob/development/src/typeahead/typeahead.directive.ts


}

