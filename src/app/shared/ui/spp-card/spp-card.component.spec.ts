import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SppCardComponent } from './spp-card.component';

describe('SppCardComponent', () => {
  let component: SppCardComponent;
  let fixture: ComponentFixture<SppCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SppCardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SppCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
