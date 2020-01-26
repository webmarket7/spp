import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ArticleCommentCardComponent } from './article-comment-card.component';

describe('ArticleCommentCardComponent', () => {
  let component: ArticleCommentCardComponent;
  let fixture: ComponentFixture<ArticleCommentCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ArticleCommentCardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ArticleCommentCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
