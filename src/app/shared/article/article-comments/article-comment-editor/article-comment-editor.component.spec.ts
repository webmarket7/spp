import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ArticleCommentEditorComponent } from './article-comment-editor.component';

describe('ArticleCommentEditorComponent', () => {
  let component: ArticleCommentEditorComponent;
  let fixture: ComponentFixture<ArticleCommentEditorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ArticleCommentEditorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ArticleCommentEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
