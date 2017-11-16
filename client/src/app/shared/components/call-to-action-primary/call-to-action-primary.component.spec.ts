import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CallToActionPrimaryComponent } from './call-to-action-primary.component';

describe('CallToActionPrimaryComponent', () => {
  let component: CallToActionPrimaryComponent;
  let fixture: ComponentFixture<CallToActionPrimaryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CallToActionPrimaryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CallToActionPrimaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
