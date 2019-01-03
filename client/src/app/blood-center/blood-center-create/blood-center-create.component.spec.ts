import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BloodCenterCreateComponent } from './blood-center-create.component';

describe('BloodCenterCreateComponent', () => {
  let component: BloodCenterCreateComponent;
  let fixture: ComponentFixture<BloodCenterCreateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BloodCenterCreateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BloodCenterCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
