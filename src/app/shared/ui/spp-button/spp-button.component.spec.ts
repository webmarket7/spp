import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SppButtonComponent } from './spp-button.component';

describe('SppButtonComponent', () => {
  let component: SppButtonComponent;
  let fixture: ComponentFixture<SppButtonComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SppButtonComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SppButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
