import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SppViewsComponent } from './spp-views.component';
import { RouterModule } from '@angular/router';
import { SppIconModule } from '../spp-icon/spp-icon.module';


@NgModule({
    declarations: [
        SppViewsComponent
    ],
    imports: [
        CommonModule,
        RouterModule,
        SppIconModule
    ],
    exports: [
        SppViewsComponent
    ]
})
export class SppViewsModule {
}
