import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DonationUpdateComponent } from './donation-update.component';

describe('DonationUpdateComponent', () => {
  let component: DonationUpdateComponent;
  let fixture: ComponentFixture<DonationUpdateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DonationUpdateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DonationUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
