import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ContentsSidebarComponent } from './contents-sidebar.component';

describe('ContentsSidebarComponent', () => {
  let component: ContentsSidebarComponent;
  let fixture: ComponentFixture<ContentsSidebarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ContentsSidebarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContentsSidebarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
