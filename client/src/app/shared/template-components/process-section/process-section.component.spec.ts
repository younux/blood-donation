import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProcessSectionComponent } from './process-section.component';

describe('ProcessSectionComponent', () => {
  let component: ProcessSectionComponent;
  let fixture: ComponentFixture<ProcessSectionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProcessSectionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProcessSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
