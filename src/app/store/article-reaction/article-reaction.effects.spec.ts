import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Observable } from 'rxjs';

import { ArticleReactionEffects } from './article-reaction.effects';

describe('ArticleReactionEffects', () => {
  let actions$: Observable<any>;
  let effects: ArticleReactionEffects;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        ArticleReactionEffects,
        provideMockActions(() => actions$)
      ]
    });

    effects = TestBed.get<ArticleReactionEffects>(ArticleReactionEffects);
  });

  it('should be created', () => {
    expect(effects).toBeTruthy();
  });
});
