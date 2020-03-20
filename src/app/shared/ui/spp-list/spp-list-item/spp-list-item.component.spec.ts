import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SppListItemComponent } from './spp-list-item.component';

describe('SppListItemComponent', () => {
  let component: SppListItemComponent;
  let fixture: ComponentFixture<SppListItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SppListItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SppListItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
