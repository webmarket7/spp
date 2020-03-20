import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SppCommentComponent } from './spp-comment.component';

describe('SppCommentComponent', () => {
  let component: SppCommentComponent;
  let fixture: ComponentFixture<SppCommentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SppCommentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SppCommentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
