import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DonationListAllComponent } from './donation-list-all.component';

describe('DonationListAllComponent', () => {
  let component: DonationListAllComponent;
  let fixture: ComponentFixture<DonationListAllComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DonationListAllComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DonationListAllComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
