import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CallToActionTertiaryComponent } from './call-to-action-tertiary.component';

describe('CallToActionTertiaryComponent', () => {
  let component: CallToActionTertiaryComponent;
  let fixture: ComponentFixture<CallToActionTertiaryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CallToActionTertiaryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CallToActionTertiaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
