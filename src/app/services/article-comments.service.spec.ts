import { TestBed } from '@angular/core/testing';

import { ArticleCommentsService } from './article-comments.service';

describe('ArticleCommentsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ArticleCommentsService = TestBed.get(ArticleCommentsService);
    expect(service).toBeTruthy();
  });
});
