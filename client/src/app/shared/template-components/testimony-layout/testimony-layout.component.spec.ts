import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TestimonyLayoutComponent } from './testimony-layout.component';

describe('TestimonyLayoutComponent', () => {
  let component: TestimonyLayoutComponent;
  let fixture: ComponentFixture<TestimonyLayoutComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TestimonyLayoutComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestimonyLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
