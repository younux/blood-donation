import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CallToAction1Component } from './call-to-action-1.component';

describe('CallToAction1Component', () => {
  let component: CallToAction1Component;
  let fixture: ComponentFixture<CallToAction1Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CallToAction1Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CallToAction1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
