import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ArticleFavsComponent } from './article-favs.component';

describe('ArticleFavsComponent', () => {
  let component: ArticleFavsComponent;
  let fixture: ComponentFixture<ArticleFavsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ArticleFavsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ArticleFavsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
