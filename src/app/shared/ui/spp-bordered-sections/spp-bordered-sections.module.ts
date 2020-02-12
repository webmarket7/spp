import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SppBorderedSectionsComponent } from './spp-bordered-sections.component';
import { SppBorderedSectionComponent } from './spp-bordered-section/spp-bordered-section.component';


@NgModule({
    declarations: [
        SppBorderedSectionsComponent,
        SppBorderedSectionComponent
    ],
    imports: [
        CommonModule
    ],
    exports: [
        SppBorderedSectionsComponent,
        SppBorderedSectionComponent
    ]
})
export class SppBorderedSectionsModule {
}
