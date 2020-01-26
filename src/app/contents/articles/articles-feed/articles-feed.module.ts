import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ArticlesFeedRoutingModule } from './articles-feed-routing.module';
import { ArticlesFeedComponent } from './articles-feed.component';
import { ArticlesDefaultViewComponent } from './articles-default-view/articles-default-view.component';
import { ArticlesListViewComponent } from './articles-list-view/articles-list-view.component';
import { ArticlesTilesViewComponent } from './articles-tiles-view/articles-tiles-view.component';
import { SppPageLayoutModule } from '../../../shared/ui/spp-page-layout/spp-page-layout.module';
import { SppIconModule } from '../../../shared/ui/spp-icon/spp-icon.module';
import { SppSidebarSectionModule } from '../../../shared/ui/spp-sidebar-section/spp-sidebar-section.module';
import { SppSidebarPortalModule } from '../../../shared/ui/spp-sidebar-portal/spp-sidebar-portal.module';
import { SppMenuItemModule } from '../../../shared/ui/spp-menu-item/spp-menu-item.module';
import { SppButtonModule } from '../../../shared/ui/spp-button/spp-button.module';
import { SppViewsModule } from '../../../shared/ui/spp-views/spp-views.module';
import { ArticleCardModule } from '../../../shared/article/article-card/article-card.module';


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
        ArticleCardModule
    ]
})
export class ArticlesFeedModule {
}
