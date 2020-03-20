import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ContentsComponent } from './contents.component';
import { AuthGuard } from '../guards/auth.guard';


const routes: Routes = [
    {
        path: '',
        component: ContentsComponent,
        children: [
            {
                path: 'articles',
                loadChildren: () => import('./articles/articles.module').then(m => m.ArticlesModule),
                canLoad: [AuthGuard]
            },
            {
                path: 'profile',
                loadChildren: () => import('./profile/profile.module').then(m => m.ProfileModule),
                canLoad: [AuthGuard]
            },
            {
                path: '',
                redirectTo: 'articles',
                pathMatch: 'full'
            }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ContentsRoutingModule {
}
