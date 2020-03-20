import { Directive, OnDestroy, OnInit, TemplateRef, ViewContainerRef } from '@angular/core';
import { SppSidebarPortalService } from './spp-sidebar-portal.service';
import { Subscription, SubscriptionLike } from 'rxjs';

@Directive({
    selector: '[sidebarPortalOutlet]'
})
export class SppSidebarPortalOutletDirective implements OnInit, OnDestroy {
    portalSubscription: SubscriptionLike = Subscription.EMPTY;

    constructor(
        private viewContainerRef: ViewContainerRef,
        private sidebarPortalService: SppSidebarPortalService
    ) {
    }

    ngOnInit(): void {
        this.portalSubscription = this.sidebarPortalService.getPortal()
            .subscribe((templateRef: TemplateRef<any>) => {
                if (templateRef) {
                    this.viewContainerRef.createEmbeddedView(templateRef);
                } else {
                    this.viewContainerRef.clear();
                }
            });
    }

    ngOnDestroy(): void {
        this.portalSubscription.unsubscribe();
    }
}
