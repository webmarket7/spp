import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SppFilterCounterComponent } from './spp-filter-counter.component';

describe('SppFilterCounterComponent', () => {
  let component: SppFilterCounterComponent;
  let fixture: ComponentFixture<SppFilterCounterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SppFilterCounterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SppFilterCounterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
