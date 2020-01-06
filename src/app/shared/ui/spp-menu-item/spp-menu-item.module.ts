import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SppMenuItemComponent } from './spp-menu-item.component';
import { SppIconModule } from '../spp-icon/spp-icon.module';


@NgModule({
    declarations: [
        SppMenuItemComponent
    ],
    imports: [
        CommonModule,
        SppIconModule
    ],
    exports: [
        SppMenuItemComponent
    ],

})
export class SppMenuItemModule {
}
