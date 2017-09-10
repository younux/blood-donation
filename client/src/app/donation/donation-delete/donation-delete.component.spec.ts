import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DonationDeleteComponent } from './donation-delete.component';

describe('DonationDeleteComponent', () => {
  let component: DonationDeleteComponent;
  let fixture: ComponentFixture<DonationDeleteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DonationDeleteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DonationDeleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
