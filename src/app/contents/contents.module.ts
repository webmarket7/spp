import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ContentsRoutingModule } from './contents-routing.module';
import { ContentsComponent } from './contents.component';
import { ContentsLayoutComponent } from './core/contents-layout/contents-layout.component';
import { ContentsSidebarComponent } from './core/contents-sidebar/contents-sidebar.component';
import { ContentsSidebarTopComponent } from './core/contents-sidebar/contents-sidebar-top/contents-sidebar-top.component';
import { ContentsSidebarMenuComponent } from './core/contents-sidebar/contents-sidebar-menu/contents-sidebar-menu.component';
import { ContentsSidebarUserComponent } from './core/contents-sidebar/contents-sidebar-user/contents-sidebar-user.component';
import { SppIconModule } from '../shared/ui/spp-icon/spp-icon.module';
import { SppSidebarSectionModule } from '../shared/ui/spp-sidebar-section/spp-sidebar-section.module';
import { SppUserModule } from '../shared/ui/spp-user/spp-user.module';
import { SppMenuItemModule } from '../shared/ui/spp-menu-item/spp-menu-item.module';
import { SppSidebarPortalModule } from '../shared/ui/spp-sidebar-portal/spp-sidebar-portal.module';


@NgModule({
    declarations: [
        ContentsComponent,
        ContentsLayoutComponent,
        ContentsSidebarComponent,
        ContentsSidebarTopComponent,
        ContentsSidebarMenuComponent,
        ContentsSidebarUserComponent
    ],
    imports: [
        CommonModule,
        ContentsRoutingModule,
        SppIconModule,
        SppSidebarPortalModule,
        SppSidebarSectionModule,
        SppUserModule,
        SppMenuItemModule,
    ]
})
export class ContentsModule {
}
