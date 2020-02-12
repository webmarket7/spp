import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SignInComponent } from './sign-in/sign-in.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { AuthComponent } from './auth.component';
import { NotAuthGuard } from '../guards/not-auth.guard';


const routes: Routes = [
    {
        path: '',
        component: AuthComponent,
        children: [
            {
                path: 'sign-in',
                component: SignInComponent,
                canActivate: [NotAuthGuard]
            },
            {
                path: 'sign-up',
                component: SignUpComponent,
                canActivate: [NotAuthGuard]
            },
            {
                path: '',
                redirectTo: 'sign-in',
                pathMatch: 'full'
            }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class AuthRoutingModule {
}
