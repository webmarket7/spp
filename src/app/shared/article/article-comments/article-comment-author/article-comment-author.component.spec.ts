import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ArticleCommentAuthorComponent } from './article-comment-author.component';

describe('ArticleCommentAuthorComponent', () => {
  let component: ArticleCommentAuthorComponent;
  let fixture: ComponentFixture<ArticleCommentAuthorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ArticleCommentAuthorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ArticleCommentAuthorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
