import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CallToActionSecondaryComponent } from './call-to-action-secondary.component';

describe('CallToActionSecondaryComponent', () => {
  let component: CallToActionSecondaryComponent;
  let fixture: ComponentFixture<CallToActionSecondaryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CallToActionSecondaryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CallToActionSecondaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
