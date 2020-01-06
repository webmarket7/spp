import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ContentsRoutingModule } from './contents-routing.module';
import { ContentsComponent } from './contents.component';


@NgModule({
    declarations: [ContentsComponent],
    imports: [
        CommonModule,
        ContentsRoutingModule
    ]
})
export class ContentsModule {
}
