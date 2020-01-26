import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SppPageLayoutComponent } from './spp-page-layout.component';

describe('SppPageLayoutComponent', () => {
  let component: SppPageLayoutComponent;
  let fixture: ComponentFixture<SppPageLayoutComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SppPageLayoutComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SppPageLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
