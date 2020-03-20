import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SppUserPicComponent } from './spp-user-pic/spp-user-pic.component';
import { UserNamePipe } from './pipes/user-name.pipe';
import { SppIconModule } from '../spp-icon/spp-icon.module';


@NgModule({
    declarations: [
        SppUserPicComponent,
        UserNamePipe
    ],
    imports: [
        CommonModule,
        SppIconModule
    ],
    exports: [
        SppUserPicComponent,
        UserNamePipe
    ]
})
export class SppUserModule {
}
