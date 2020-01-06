import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ContentsRoutingModule } from './contents-routing.module';
import { ContentsComponent } from './contents.component';
import { ContentsLayoutComponent } from './core/contents-layout/contents-layout.component';
import { ContentsSidebarComponent } from './core/contents-sidebar/contents-sidebar.component';


@NgModule({
    declarations: [ContentsComponent, ContentsLayoutComponent, ContentsSidebarComponent],
    imports: [
        CommonModule,
        ContentsRoutingModule
    ]
})
export class ContentsModule {
}
