import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DonationListMyComponent } from './donation-list-my.component';

describe('DonationListMyComponent', () => {
  let component: DonationListMyComponent;
  let fixture: ComponentFixture<DonationListMyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DonationListMyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DonationListMyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
