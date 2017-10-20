import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DonationCreateComponent } from './donation-create.component';

describe('DonationCreateComponent', () => {
  let component: DonationCreateComponent;
  let fixture: ComponentFixture<DonationCreateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DonationCreateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DonationCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
