import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProcessLayoutComponent } from './process-layout.component';

describe('ProcessLayoutComponent', () => {
  let component: ProcessLayoutComponent;
  let fixture: ComponentFixture<ProcessLayoutComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProcessLayoutComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProcessLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
