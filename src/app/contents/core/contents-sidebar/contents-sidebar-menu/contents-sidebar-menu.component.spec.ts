import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ContentsSidebarMenuComponent } from './contents-sidebar-menu.component';

describe('ContentsSidebarMenuComponent', () => {
  let component: ContentsSidebarMenuComponent;
  let fixture: ComponentFixture<ContentsSidebarMenuComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ContentsSidebarMenuComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContentsSidebarMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
