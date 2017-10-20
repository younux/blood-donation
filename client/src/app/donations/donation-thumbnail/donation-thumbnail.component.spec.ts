import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DonationThumbnailComponent } from './donation-thumbnail.component';

describe('DonationThumbnailComponent', () => {
  let component: DonationThumbnailComponent;
  let fixture: ComponentFixture<DonationThumbnailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DonationThumbnailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DonationThumbnailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
