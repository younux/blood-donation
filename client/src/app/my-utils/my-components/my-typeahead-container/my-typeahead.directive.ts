import {
  ComponentFactoryResolver, Directive, Input, TemplateRef, ViewContainerRef, OnInit,
  ElementRef, ViewChild, ViewChildren, HostBinding, HostListener
} from '@angular/core';
import {MyTypeaheadContainerComponent} from './my-typeahead-container.component';
import {Observable} from "rxjs/Observable";
import 'rxjs/add/observable/fromEvent';

@Directive({
  selector: '[appMyTypeahead]',

})
export class MyTypeaheadDirective implements OnInit {
  @Input('appMyTypeahead') itemsList: string[];
  myTypeaheadContainerComponent: MyTypeaheadContainerComponent;

  constructor(private elementRef: ElementRef,
              private viewContainer: ViewContainerRef,
              private componentFactoryResolver: ComponentFactoryResolver) {

  }

  ngOnInit() {
    // Create a component factory for MyTypeaheadContainerComponent
    const MyTypeaheadContainerComponentFactory =  this.componentFactoryResolver.resolveComponentFactory(MyTypeaheadContainerComponent);
    // Create a component in the view using the factory and ViewContainer.createComponent
    this.myTypeaheadContainerComponent = this.viewContainer.createComponent(MyTypeaheadContainerComponentFactory).instance;
    // initialise the itemsList
    this.myTypeaheadContainerComponent.itemsList = this.itemsList;
    // Subscribe to selectedItem output and set input value when a selectedItem is emitted
    this.myTypeaheadContainerComponent.selectedItem.subscribe(
      selectedItem => {
        this.elementRef.nativeElement.value = selectedItem;
      }
    )

    // // This part is replaced by @HostListener('keyup', ['$event'])
    // // Watch for keyup events in input and update the typeahead list
    // Observable.fromEvent(this.elementRef.nativeElement, 'keyup')
    //   .map((event: any) => event.target.value)
    //   .subscribe( value => {
    //     this.myTypeaheadContainerComponent.query = value;
    // });
  }

  // Disable browser autocompletion by setting host attribute autocomplete='off'
  @HostBinding('attr.autocomplete') autocomplete = 'off';

  // Watch for keyup events in input and update the typeahead list
  @HostListener('keyup', ['$event']) onChange(e: any): void {
    if (this.myTypeaheadContainerComponent) {
      // esc
      if (e.keyCode === 27) {
        // hide the suggestions / container
        this.myTypeaheadContainerComponent.hide();
        return;
      }
      // up
      if (e.keyCode === 38) {
        // go to previous item
        this.myTypeaheadContainerComponent.activatePreviousItem();
        // this.myTypeaheadContainerComponent.scroll();
        return;
      }
      // down
      if (e.keyCode === 40) {
        // go to next item
        this.myTypeaheadContainerComponent.activateNextItem();
        // this.myTypeaheadContainerComponent.scroll();
        return;
      }
      // enter
      if (e.keyCode === 13) {
        // slect the active item
        this.myTypeaheadContainerComponent.select()
        return;
      }
    }
    // For `<input>`s, use the `value` property. For others that don't have a
    // `value` (such as `<span contenteditable="true">`), use either
    // `textContent` or `innerText` (depending on which one is supported, i.e.
    // Firefox or IE).
    const value = e.target.value;
    if (value) {
      this.myTypeaheadContainerComponent.query = value;
    }else {
      this.myTypeaheadContainerComponent.hide();
    }
  }
//
//   @HostListener('focus')
//   onFocus(): void {
//     if (this.typeaheadMinLength === 0) {
//       this.typeaheadLoading.emit(true);
//       this.keyUpEventEmitter.emit('');
//     }
//   }
//
//   @HostListener('blur')
//   onBlur(): void {
//     if (this._container && !this._container.isFocused) {
//       this.typeaheadOnBlur.emit(this._container.active);
//       this.hide();
//     }
//   }
//
//   @HostListener('keydown', ['$event'])
//   onKeydown(e: any): void {
//     // no container - no problems
//     if (!this._container) {
//       return;
//     }
//
//     // if items is visible - prevent form submition
//     if (e.keyCode === 13) {
//       e.preventDefault();
//
//       return;
//     }
//   }
//
//   changeModel(match: TypeaheadMatch): void {
//     const valueStr: string = match.value;
//     this.ngControl.viewToModelUpdate(valueStr);
//     (this.ngControl.control).setValue(valueStr);
//     this.hide();
//   }
//
//   get matches(): any[] {
//     return this._matches;
//   }
//
//   show(): void {
//     this._typeahead
//       .attach(TypeaheadContainerComponent)
//       // todo: add append to body, after updating positioning service
//       .to(this.container)
//       .position({attachment: `${this.dropup ? 'top' : 'bottom'} left`})
//       .show({
//         typeaheadRef: this,
//         placement: this.placement,
//         animation: false,
//         dropup: this.dropup
//       });
//
//     this._container = this._typeahead.instance;
//     this._container.parent = this;
//     // This improves the speed as it won't have to be done for each list item
//     const normalizedQuery = (this.typeaheadLatinize
//       ? latinize(this.ngControl.control.value)
//       : this.ngControl.control.value)
//       .toString()
//       .toLowerCase();
//     this._container.query = this.typeaheadSingleWords
//       ? tokenize(
//         normalizedQuery,
//         this.typeaheadWordDelimiters,
//         this.typeaheadPhraseDelimiters
//       )
//       : normalizedQuery;
//     this._container.matches = this._matches;
//     this.element.nativeElement.focus();
//   }
//
//   hide(): void {
//     if (this._typeahead.isShown) {
//       this._typeahead.hide();
//       this._container = null;
//     }
//   }
//
//
//
// // see ngx bootstrap typeahead : https://github.com/valor-software/ngx-bootstrap/blob/development/src/typeahead/typeahead.directive.ts
//


}
