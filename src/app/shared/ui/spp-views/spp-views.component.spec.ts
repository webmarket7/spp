import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SppViewsComponent } from './spp-views.component';

describe('SppViewsComponent', () => {
  let component: SppViewsComponent;
  let fixture: ComponentFixture<SppViewsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SppViewsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SppViewsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
