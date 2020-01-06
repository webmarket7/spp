import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SppUserPicComponent } from './spp-user-pic/spp-user-pic.component';
import { UserNamePipe } from './pipes/user-name.pipe';


@NgModule({
    declarations: [
        SppUserPicComponent,
        UserNamePipe
    ],
    imports: [
        CommonModule
    ],
    exports: [
        SppUserPicComponent,
        UserNamePipe
    ]
})
export class SppUserModule {
}
