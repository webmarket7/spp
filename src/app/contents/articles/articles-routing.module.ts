import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../../guards/auth.guard';


const routes: Routes = [
    {
        path: 'feed',
        loadChildren: () => import('./articles-feed/articles-feed.module').then(m => m.ArticlesFeedModule),
        canLoad: [AuthGuard]
    },
    {
        path: 'article',
        loadChildren: () => import('./article-page/article-page.module').then(m => m.ArticlePageModule),
        canLoad: [AuthGuard]
    },
    {
        path: 'editor',
        loadChildren: () => import('./article-editor/article-editor.module').then(m => m.ArticleEditorModule),
        canLoad: [AuthGuard]
    },
    {
        path: '',
        redirectTo: 'feed',
        pathMatch: 'full'
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ArticlesRoutingModule {
}
