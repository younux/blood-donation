import {AfterViewInit, Directive, ElementRef} from '@angular/core';

@Directive({
  selector: '[appScrollTo]'
})
export class ScrollToDirective implements AfterViewInit{

  constructor(private elementRef: ElementRef) { }

  ngAfterViewInit() {
    this.elementRef.nativeElement.scrollIntoView();
  }

}
