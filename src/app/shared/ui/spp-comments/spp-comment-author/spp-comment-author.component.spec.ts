import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SppCommentAuthorComponent } from './spp-comment-author.component';

describe('SppCommentAuthorComponent', () => {
  let component: SppCommentAuthorComponent;
  let fixture: ComponentFixture<SppCommentAuthorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SppCommentAuthorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SppCommentAuthorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
