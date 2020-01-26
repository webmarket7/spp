import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';


const routes: Routes = [
    {
        path: '',
        redirectTo: 'feed',
        pathMatch: 'full'
    },
    {
        path: 'feed',
        loadChildren: () => import('./articles-feed/articles-feed.module').then(m => m.ArticlesFeedModule),
    },
    {
        path: 'article',
        loadChildren: () => import('./article-page/article-page.module').then(m => m.ArticlePageModule),
    },
    {
        path: 'editor',
        loadChildren: () => import('./article-editor/article-editor.module').then(m => m.ArticleEditorModule),
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ArticlesRoutingModule {
}
