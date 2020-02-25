import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Observable } from 'rxjs';

import { ArticleEditorEffects } from './article-editor.effects';

describe('ArticleEditorEffects', () => {
  let actions$: Observable<any>;
  let effects: ArticleEditorEffects;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        ArticleEditorEffects,
        provideMockActions(() => actions$)
      ]
    });

    effects = TestBed.get<ArticleEditorEffects>(ArticleEditorEffects);
  });

  it('should be created', () => {
    expect(effects).toBeTruthy();
  });
});
