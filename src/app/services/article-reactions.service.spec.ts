import { TestBed } from '@angular/core/testing';

import { ArticleReactionsService } from './article-reactions.service';

describe('ArticleReactionsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ArticleReactionsService = TestBed.get(ArticleReactionsService);
    expect(service).toBeTruthy();
  });
});
