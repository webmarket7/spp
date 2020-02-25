import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ArticlesTilesViewComponent } from './articles-tiles-view.component';

describe('ArticlesTilesViewComponent', () => {
  let component: ArticlesTilesViewComponent;
  let fixture: ComponentFixture<ArticlesTilesViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ArticlesTilesViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ArticlesTilesViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
