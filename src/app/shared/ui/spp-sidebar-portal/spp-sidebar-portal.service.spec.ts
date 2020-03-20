import { TestBed } from '@angular/core/testing';

import { SppSidebarPortalService } from './spp-sidebar-portal.service';

describe('SidebarPortalService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SppSidebarPortalService = TestBed.get(SppSidebarPortalService);
    expect(service).toBeTruthy();
  });
});
