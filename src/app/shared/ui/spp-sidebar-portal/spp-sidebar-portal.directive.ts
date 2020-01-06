import { Directive, NgZone, OnDestroy, OnInit, TemplateRef } from '@angular/core';
import { SppSidebarPortalService } from './spp-sidebar-portal.service';
import { take } from 'rxjs/operators';

@Directive({
    selector: '[sidebarPortal]'
})
export class SppSidebarPortalDirective implements OnInit, OnDestroy {
    constructor(
        private templateRef: TemplateRef<any>,
        private sidebarPortalService: SppSidebarPortalService,
        private ngZone: NgZone
    ) {
    }

    ngOnInit(): void {
        this.ngZone.onStable.pipe(take(1)).subscribe(() => {
            this.ngZone.run(() => {
                this.sidebarPortalService.projectInPortal(this.templateRef);
            });
        });
    }

    ngOnDestroy(): void {
        this.sidebarPortalService.clearPortal();
    }
}
