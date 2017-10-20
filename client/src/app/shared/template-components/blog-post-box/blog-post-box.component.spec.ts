import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BlogPostBoxComponent } from './blog-post-box.component';

describe('BlogPostBoxComponent', () => {
  let component: BlogPostBoxComponent;
  let fixture: ComponentFixture<BlogPostBoxComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BlogPostBoxComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BlogPostBoxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
