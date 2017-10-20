import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CallToAction2Component } from './call-to-action-2.component';

describe('CallToAction2Component', () => {
  let component: CallToAction2Component;
  let fixture: ComponentFixture<CallToAction2Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CallToAction2Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CallToAction2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
