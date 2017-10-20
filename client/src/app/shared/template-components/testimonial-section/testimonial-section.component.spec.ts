import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TestimonialSectionComponent } from './testimonial-section.component';

describe('TestimonialSectionComponent', () => {
  let component: TestimonialSectionComponent;
  let fixture: ComponentFixture<TestimonialSectionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TestimonialSectionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestimonialSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
