import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ImageUploaderComponent } from './image-uploader.component';
import { SppIconModule } from '../spp-icon/spp-icon.module';


@NgModule({
    declarations: [
        ImageUploaderComponent
    ],
    imports: [
        CommonModule,
        SppIconModule
    ],
    exports: [
        ImageUploaderComponent,
    ]
})
export class ImageUploaderModule {
}
