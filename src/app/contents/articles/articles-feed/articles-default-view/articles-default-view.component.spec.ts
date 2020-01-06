import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ArticlesDefaultViewComponent } from './articles-default-view.component';

describe('ArticlesDefaultViewComponent', () => {
  let component: ArticlesDefaultViewComponent;
  let fixture: ComponentFixture<ArticlesDefaultViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ArticlesDefaultViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ArticlesDefaultViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
