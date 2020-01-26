import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ContentsLayoutComponent } from './contents-layout.component';

describe('ContentsLayoutComponent', () => {
  let component: ContentsLayoutComponent;
  let fixture: ComponentFixture<ContentsLayoutComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ContentsLayoutComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContentsLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
