import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Observable } from 'rxjs';

import { ArticlePageEffects } from './article-page.effects';

describe('ArticlePageEffects', () => {
  let actions$: Observable<any>;
  let effects: ArticlePageEffects;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        ArticlePageEffects,
        provideMockActions(() => actions$)
      ]
    });

    effects = TestBed.get<ArticlePageEffects>(ArticlePageEffects);
  });

  it('should be created', () => {
    expect(effects).toBeTruthy();
  });
});
