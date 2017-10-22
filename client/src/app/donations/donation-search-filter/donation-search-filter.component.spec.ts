import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DonationSearchFilterComponent } from './donation-search-filter.component';

describe('DonationSearchFilterComponent', () => {
  let component: DonationSearchFilterComponent;
  let fixture: ComponentFixture<DonationSearchFilterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DonationSearchFilterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DonationSearchFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
