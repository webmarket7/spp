import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SppMenuItemComponent } from './spp-menu-item.component';

describe('SppMenuItemComponent', () => {
  let component: SppMenuItemComponent;
  let fixture: ComponentFixture<SppMenuItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SppMenuItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SppMenuItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
