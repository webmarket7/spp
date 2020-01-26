import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SppSidebarPortalDirective } from './spp-sidebar-portal.directive';
import { SppSidebarPortalOutletDirective } from './spp-sidebar-portal-outlet.directive';



@NgModule({
    declarations: [
        SppSidebarPortalDirective,
        SppSidebarPortalOutletDirective
    ],
    exports: [
        SppSidebarPortalDirective,
        SppSidebarPortalOutletDirective
    ],
    imports: [
        CommonModule
    ]
})
export class SppSidebarPortalModule {
}
