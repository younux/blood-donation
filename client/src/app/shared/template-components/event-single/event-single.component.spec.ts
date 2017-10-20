import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EventSingleComponent } from './event-single.component';

describe('EventSingleComponent', () => {
  let component: EventSingleComponent;
  let fixture: ComponentFixture<EventSingleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EventSingleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EventSingleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
