import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { ArticlesFeedRoutingModule } from './articles-feed-routing.module';
import { ArticlesFeedComponent } from './articles-feed.component';
import { ArticlesDefaultViewComponent } from './views/articles-default-view/articles-default-view.component';
import { ArticlesListViewComponent } from './views/articles-list-view/articles-list-view.component';
import { ArticlesTilesViewComponent } from './views/articles-tiles-view/articles-tiles-view.component';
import { SppPageLayoutModule } from '../../../shared/ui/spp-page-layout/spp-page-layout.module';
import { SppIconModule } from '../../../shared/ui/spp-icon/spp-icon.module';
import { SppSidebarSectionModule } from '../../../shared/ui/spp-sidebar-section/spp-sidebar-section.module';
import { SppSidebarPortalModule } from '../../../shared/ui/spp-sidebar-portal/spp-sidebar-portal.module';
import { SppMenuItemModule } from '../../../shared/ui/spp-menu-item/spp-menu-item.module';
import { SppButtonModule } from '../../../shared/ui/spp-button/spp-button.module';
import { SppViewsModule } from '../../../shared/ui/spp-views/spp-views.module';
import { ArticleCardModule } from '../../../shared/article/article-card/article-card.module';
import { SppFilterModule } from '../../../shared/ui/spp-filter/spp-filter.module';
import { SppUserModule } from '../../../shared/ui/spp-user/spp-user.module';
import { ArticlesFeedEffects } from './store/articles-feed.effects';
import * as fromArticlesFeed from './store/articles-feed.reducer';


@NgModule({
    declarations: [
        ArticlesFeedComponent,
        ArticlesDefaultViewComponent,
        ArticlesListViewComponent,
        ArticlesTilesViewComponent
    ],
    imports: [
        CommonModule,
        ArticlesFeedRoutingModule,
        SppPageLayoutModule,
        SppIconModule,
        SppButtonModule,
        SppSidebarSectionModule,
        SppSidebarPortalModule,
        SppMenuItemModule,
        SppViewsModule,
        ArticleCardModule,
        SppFilterModule,
        SppUserModule,
        StoreModule.forFeature(fromArticlesFeed.articlesFeedFeatureKey, fromArticlesFeed.reducer),
        EffectsModule.forFeature([ArticlesFeedEffects]),
    ]
})
export class ArticlesFeedModule {
}
