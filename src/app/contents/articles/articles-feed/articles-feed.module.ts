import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ArticlesFeedRoutingModule } from './articles-feed-routing.module';
import { ArticlesFeedComponent } from './articles-feed.component';
import { ArticlesDefaultViewComponent } from './articles-default-view/articles-default-view.component';
import { ArticlesListViewComponent } from './articles-list-view/articles-list-view.component';
import { ArticlesTilesViewComponent } from './articles-tiles-view/articles-tiles-view.component';


@NgModule({
  declarations: [ArticlesFeedComponent, ArticlesDefaultViewComponent, ArticlesListViewComponent, ArticlesTilesViewComponent],
  imports: [
    CommonModule,
    ArticlesFeedRoutingModule
  ]
})
export class ArticlesFeedModule { }
