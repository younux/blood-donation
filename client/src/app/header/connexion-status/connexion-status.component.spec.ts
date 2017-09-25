import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConnexionStatusComponent } from './connexion-status.component';

describe('ConnexionStatusComponent', () => {
  let component: ConnexionStatusComponent;
  let fixture: ComponentFixture<ConnexionStatusComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConnexionStatusComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConnexionStatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
