import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ArticlesFeedComponent } from './articles-feed.component';

describe('ArticlesFeedComponent', () => {
  let component: ArticlesFeedComponent;
  let fixture: ComponentFixture<ArticlesFeedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ArticlesFeedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ArticlesFeedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
