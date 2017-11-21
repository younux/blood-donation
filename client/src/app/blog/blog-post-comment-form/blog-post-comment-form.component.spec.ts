import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BlogPostCommentFormComponent } from './blog-post-comment-form.component';

describe('BlogPostCommentFormComponent', () => {
  let component: BlogPostCommentFormComponent;
  let fixture: ComponentFixture<BlogPostCommentFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BlogPostCommentFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BlogPostCommentFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
