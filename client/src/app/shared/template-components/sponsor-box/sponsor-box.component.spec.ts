import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SponsorBoxComponent } from './sponsor-box.component';

describe('SponsorBoxComponent', () => {
  let component: SponsorBoxComponent;
  let fixture: ComponentFixture<SponsorBoxComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SponsorBoxComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SponsorBoxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
