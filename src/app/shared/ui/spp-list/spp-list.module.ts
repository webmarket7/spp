import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SppListComponent } from './spp-list.component';
import { FormsModule } from '@angular/forms';
import { SppListItemComponent } from './spp-list-item/spp-list-item.component';
import { SppListSearchComponent } from './spp-list-search/spp-list-search.component';


@NgModule({
    declarations: [
        SppListComponent,
        SppListItemComponent,
        SppListSearchComponent
    ],
    imports: [
        CommonModule,
        FormsModule
    ],
    exports: [
        SppListComponent,
        SppListSearchComponent
    ]
})
export class SppListModule {
}
