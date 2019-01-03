import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BloodCenterDetailComponent } from './blood-center-detail.component';

describe('BloodCenterDetailComponent', () => {
  let component: BloodCenterDetailComponent;
  let fixture: ComponentFixture<BloodCenterDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BloodCenterDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BloodCenterDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
