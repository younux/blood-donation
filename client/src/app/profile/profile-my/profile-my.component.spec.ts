import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileMyComponent } from './profile-my.component';

describe('ProfileMyComponent', () => {
  let component: ProfileMyComponent;
  let fixture: ComponentFixture<ProfileMyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProfileMyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfileMyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
