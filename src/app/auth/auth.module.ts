import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule, MatInputModule } from '@angular/material';

import { AuthRoutingModule } from './auth-routing.module';
import { AuthComponent } from './auth.component';
import { SignInComponent } from './sign-in/sign-in.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { SppButtonModule } from '../shared/ui/spp-button/spp-button.module';
import { SppIconModule } from '../shared/ui/spp-icon/spp-icon.module';


@NgModule({
    declarations: [AuthComponent, SignInComponent, SignUpComponent],
    imports: [
        CommonModule,
        FormsModule,
        AuthRoutingModule,
        MatFormFieldModule,
        MatInputModule,
        SppButtonModule,
        SppIconModule
    ]
})
export class AuthModule {
}
