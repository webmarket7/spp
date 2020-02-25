import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Observable } from 'rxjs';

import { ArticlesFeedEffects } from './articles-feed.effects';

describe('ArticlesFeedEffects', () => {
  let actions$: Observable<any>;
  let effects: ArticlesFeedEffects;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        ArticlesFeedEffects,
        provideMockActions(() => actions$)
      ]
    });

    effects = TestBed.get<ArticlesFeedEffects>(ArticlesFeedEffects);
  });

  it('should be created', () => {
    expect(effects).toBeTruthy();
  });
});
