import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ArticleTagsSelectorComponent } from './article-tags-selector.component';

describe('ArticleTagsSelectorComponent', () => {
  let component: ArticleTagsSelectorComponent;
  let fixture: ComponentFixture<ArticleTagsSelectorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ArticleTagsSelectorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ArticleTagsSelectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
