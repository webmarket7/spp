import { TestBed } from '@angular/core/testing';

import { ArticleTagsService } from './article-tags.service';

describe('ArticleTagsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ArticleTagsService = TestBed.get(ArticleTagsService);
    expect(service).toBeTruthy();
  });
});
