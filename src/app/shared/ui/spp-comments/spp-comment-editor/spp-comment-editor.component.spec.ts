import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SppCommentEditorComponent } from './spp-comment-editor.component';

describe('SppCommentEditorComponent', () => {
  let component: SppCommentEditorComponent;
  let fixture: ComponentFixture<SppCommentEditorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SppCommentEditorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SppCommentEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
