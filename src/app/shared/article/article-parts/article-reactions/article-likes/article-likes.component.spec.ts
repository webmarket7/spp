import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ArticleLikesComponent } from './article-likes.component';

describe('ArticleLikesComponent', () => {
  let component: ArticleLikesComponent;
  let fixture: ComponentFixture<ArticleLikesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ArticleLikesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ArticleLikesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
