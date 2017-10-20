import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SponsorsSectionComponent } from './sponsors-section.component';

describe('SponsorsSectionComponent', () => {
  let component: SponsorsSectionComponent;
  let fixture: ComponentFixture<SponsorsSectionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SponsorsSectionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SponsorsSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
