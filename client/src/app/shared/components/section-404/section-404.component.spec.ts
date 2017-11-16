import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Section404Component } from './section-404.component';

describe('Section404Component', () => {
  let component: Section404Component;
  let fixture: ComponentFixture<Section404Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Section404Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Section404Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
