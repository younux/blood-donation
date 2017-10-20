import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CounterBlockComponent } from './counter-block.component';

describe('CounterBlockComponent', () => {
  let component: CounterBlockComponent;
  let fixture: ComponentFixture<CounterBlockComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CounterBlockComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CounterBlockComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
