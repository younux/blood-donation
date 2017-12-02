import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BlogPostCommentListComponent } from './blog-post-comment-list.component';

describe('BlogPostCommentListComponent', () => {
  let component: BlogPostCommentListComponent;
  let fixture: ComponentFixture<BlogPostCommentListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BlogPostCommentListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BlogPostCommentListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
