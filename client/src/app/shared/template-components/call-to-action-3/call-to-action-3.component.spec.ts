import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CallToAction3Component } from './call-to-action-3.component';

describe('CallToAction3Component', () => {
  let component: CallToAction3Component;
  let fixture: ComponentFixture<CallToAction3Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CallToAction3Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CallToAction3Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
