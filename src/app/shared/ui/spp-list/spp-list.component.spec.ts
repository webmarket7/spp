import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SppListComponent } from './spp-list.component';

describe('SppListComponent', () => {
  let component: SppListComponent;
  let fixture: ComponentFixture<SppListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SppListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SppListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
