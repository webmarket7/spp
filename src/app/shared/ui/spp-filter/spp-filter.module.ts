import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { OverlayModule } from '@angular/cdk/overlay';
import { SppCardModule } from '../spp-card/spp-card.module';
import { SppListModule } from '../spp-list/spp-list.module';
import { SppIconModule } from '../spp-icon/spp-icon.module';

import { SppFilterComponent } from './spp-filter.component';
import { SppFilterButtonComponent } from './spp-filter-button/spp-filter-button.component';
import { SppFilterCounterComponent } from './spp-filter-counter/spp-filter-counter.component';


@NgModule({
    declarations: [
        SppFilterComponent,
        SppFilterButtonComponent,
        SppFilterCounterComponent
    ],
    imports: [
        CommonModule,
        OverlayModule,
        SppIconModule,
        SppListModule,
        ReactiveFormsModule,
        SppCardModule
    ],
    exports: [
        SppFilterComponent
    ]
})
export class SppFilterModule {
}
