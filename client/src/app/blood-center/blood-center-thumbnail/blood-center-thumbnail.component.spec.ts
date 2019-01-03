import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BloodCenterThumbnailComponent } from './blood-center-thumbnail.component';

describe('BloodCenterThumbnailComponent', () => {
  let component: BloodCenterThumbnailComponent;
  let fixture: ComponentFixture<BloodCenterThumbnailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BloodCenterThumbnailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BloodCenterThumbnailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
