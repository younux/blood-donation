import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MyTypeaheadContainerComponent } from './my-typeahead-container.component';

describe('MyTypeaheadContainerComponent', () => {
  let component: MyTypeaheadContainerComponent;
  let fixture: ComponentFixture<MyTypeaheadContainerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MyTypeaheadContainerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MyTypeaheadContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
