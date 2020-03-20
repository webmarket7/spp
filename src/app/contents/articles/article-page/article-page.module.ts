import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { ArticlePageRoutingModule } from './article-page-routing.module';
import { ArticlePageComponent } from './article-page.component';
import { ArticleCommentsComponent } from './article-comments/article-comments.component';

import { SppPageLayoutModule } from '../../../shared/ui/spp-page-layout/spp-page-layout.module';
import { SppMenuItemModule } from '../../../shared/ui/spp-menu-item/spp-menu-item.module';
import { SppSidebarSectionModule } from '../../../shared/ui/spp-sidebar-section/spp-sidebar-section.module';
import { SppBorderedSectionsModule } from '../../../shared/ui/spp-bordered-sections/spp-bordered-sections.module';
import { SppSidebarPortalModule } from '../../../shared/ui/spp-sidebar-portal/spp-sidebar-portal.module';
import { SppCommentsModule } from '../../../shared/ui/spp-comments/spp-comments.module';
import { SppCardModule } from '../../../shared/ui/spp-card/spp-card.module';
import { ArticleTagsModule } from '../../../shared/article/article-tags/article-tags.module';
import { ArticlePartsModule } from '../../../shared/article/article-parts/article-parts.module';

import { ArticlePageEffects } from './store/article-page.effects';
import * as fromArticlePage from './store/article-page.reducer';


@NgModule({
  declarations: [
      ArticlePageComponent,
      ArticleCommentsComponent
  ],
    imports: [
        CommonModule,
        ArticlePageRoutingModule,
        SppSidebarPortalModule,
        SppSidebarSectionModule,
        SppPageLayoutModule,
        SppMenuItemModule,
        SppCommentsModule,
        SppCardModule,
        ArticleTagsModule,
        ArticlePartsModule,
        SppBorderedSectionsModule,
        StoreModule.forFeature(fromArticlePage.articlePageFeatureKey, fromArticlePage.reducer),
        EffectsModule.forFeature([ArticlePageEffects]),
    ]
})
export class ArticlePageModule { }
