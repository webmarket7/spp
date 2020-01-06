import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ArticlesFeedComponent } from './articles-feed.component';
import { ArticlesDefaultViewComponent } from './articles-default-view/articles-default-view.component';
import { ArticlesListViewComponent } from './articles-list-view/articles-list-view.component';
import { ArticlesTilesViewComponent } from './articles-tiles-view/articles-tiles-view.component';


const routes: Routes = [
    {
        path: '',
        component: ArticlesFeedComponent,
        children: [
            {
                path: '',
                redirectTo: 'list',
                pathMatch: 'full'
            },
            {
                path: 'default',
                component: ArticlesDefaultViewComponent
            },
            {
                path: 'list',
                component: ArticlesListViewComponent
            },
            {
                path: 'tiles',
                component: ArticlesTilesViewComponent
            },
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ArticlesFeedRoutingModule {
}
