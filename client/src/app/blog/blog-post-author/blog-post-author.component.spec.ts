import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BlogPostAuthorComponent } from './blog-post-author.component';

describe('BlogPostAuthorComponent', () => {
  let component: BlogPostAuthorComponent;
  let fixture: ComponentFixture<BlogPostAuthorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BlogPostAuthorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BlogPostAuthorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
