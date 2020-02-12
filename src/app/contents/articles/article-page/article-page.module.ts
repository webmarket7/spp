import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ArticlePageRoutingModule } from './article-page-routing.module';
import { ArticlePageComponent } from './article-page.component';
import { SppPageLayoutModule } from '../../../shared/ui/spp-page-layout/spp-page-layout.module';
import { SppMenuItemModule } from '../../../shared/ui/spp-menu-item/spp-menu-item.module';
import { SppSidebarSectionModule } from '../../../shared/ui/spp-sidebar-section/spp-sidebar-section.module';
import { ArticleTagsModule } from '../../../shared/article/article-tags/article-tags.module';
import { ArticlePartsModule } from '../../../shared/article/article-parts/article-parts.module';
import { SppBorderedSectionsModule } from '../../../shared/ui/spp-bordered-sections/spp-bordered-sections.module';
import { SppSidebarPortalModule } from '../../../shared/ui/spp-sidebar-portal/spp-sidebar-portal.module';


@NgModule({
  declarations: [ArticlePageComponent],
    imports: [
        CommonModule,
        ArticlePageRoutingModule,
        SppSidebarPortalModule,
        SppSidebarSectionModule,
        SppPageLayoutModule,
        SppMenuItemModule,
        ArticleTagsModule,
        ArticlePartsModule,
        SppBorderedSectionsModule
    ]
})
export class ArticlePageModule { }
