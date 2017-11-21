import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BlogPostThumbnailComponent } from './blog-post-thumbnail.component';

describe('BlogPostThumbnailComponent', () => {
  let component: BlogPostThumbnailComponent;
  let fixture: ComponentFixture<BlogPostThumbnailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BlogPostThumbnailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BlogPostThumbnailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
