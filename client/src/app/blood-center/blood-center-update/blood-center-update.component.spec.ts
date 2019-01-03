import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BloodCenterUpdateComponent } from './blood-center-update.component';

describe('BloodCenterUpdateComponent', () => {
  let component: BloodCenterUpdateComponent;
  let fixture: ComponentFixture<BloodCenterUpdateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BloodCenterUpdateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BloodCenterUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
