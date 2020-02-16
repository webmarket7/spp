import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SppListSearchComponent } from './spp-list-search.component';

describe('SppListSearchComponent', () => {
  let component: SppListSearchComponent;
  let fixture: ComponentFixture<SppListSearchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SppListSearchComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SppListSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
