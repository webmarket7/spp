import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SppFilterButtonComponent } from './spp-filter-button.component';

describe('SppFilterButtonComponent', () => {
  let component: SppFilterButtonComponent;
  let fixture: ComponentFixture<SppFilterButtonComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SppFilterButtonComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SppFilterButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
