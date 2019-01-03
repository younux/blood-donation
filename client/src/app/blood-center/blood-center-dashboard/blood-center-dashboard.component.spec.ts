import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BloodCenterDashboardComponent } from './blood-center-dashboard.component';

describe('BloodCenterDashboardComponent', () => {
  let component: BloodCenterDashboardComponent;
  let fixture: ComponentFixture<BloodCenterDashboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BloodCenterDashboardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BloodCenterDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
