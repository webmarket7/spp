import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SppFilterComponent } from './spp-filter.component';

describe('SppFilterComponent', () => {
  let component: SppFilterComponent;
  let fixture: ComponentFixture<SppFilterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SppFilterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SppFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
