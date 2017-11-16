import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BoxLayoutComponent } from './box-layout.component';

describe('BoxLayoutComponent', () => {
  let component: BoxLayoutComponent;
  let fixture: ComponentFixture<BoxLayoutComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BoxLayoutComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BoxLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
