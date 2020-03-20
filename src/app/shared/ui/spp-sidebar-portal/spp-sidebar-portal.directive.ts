import { AfterViewInit, Directive, NgZone, OnDestroy, OnInit, TemplateRef } from '@angular/core';
import { SppSidebarPortalService } from './spp-sidebar-portal.service';

@Directive({
    selector: '[sidebarPortal]'
})
export class SppSidebarPortalDirective implements OnInit, OnDestroy {
    constructor(
        private templateRef: TemplateRef<any>,
        private sidebarPortalService: SppSidebarPortalService
    ) {
    }

    ngOnInit(): void {
        this.sidebarPortalService.projectInPortal(this.templateRef);
    }

    ngOnDestroy(): void {
        this.sidebarPortalService.clearPortal();
    }
}
