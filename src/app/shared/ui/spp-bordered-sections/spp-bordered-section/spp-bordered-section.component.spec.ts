import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SppBorderedSectionComponent } from './spp-bordered-section.component';

describe('SppBorderedSectionComponent', () => {
  let component: SppBorderedSectionComponent;
  let fixture: ComponentFixture<SppBorderedSectionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SppBorderedSectionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SppBorderedSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
