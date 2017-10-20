import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TypeaheadContainerComponent } from './typeahead-container.component';

describe('TypeaheadContainerComponent', () => {
  let component: TypeaheadContainerComponent;
  let fixture: ComponentFixture<TypeaheadContainerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TypeaheadContainerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TypeaheadContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
