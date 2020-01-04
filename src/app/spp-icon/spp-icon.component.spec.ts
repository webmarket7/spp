import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SppIconComponent } from './spp-icon.component';

describe('SppIconComponent', () => {
  let component: SppIconComponent;
  let fixture: ComponentFixture<SppIconComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SppIconComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SppIconComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
