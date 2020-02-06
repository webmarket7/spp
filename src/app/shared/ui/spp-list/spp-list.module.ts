import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SppListComponent } from './spp-list.component';
import { FormsModule } from '@angular/forms';
import { SppListItemComponent } from './spp-list-item/spp-list-item.component';


@NgModule({
    declarations: [
        SppListComponent,
        SppListItemComponent,
    ],
    imports: [
        CommonModule,
        FormsModule
    ],
    exports: [
        SppListComponent
    ]
})
export class SppListModule {
}
