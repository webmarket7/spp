import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ArticleCardComponent } from './article-card.component';
import { SppCardModule } from '../../ui/spp-card/spp-card.module';
import { ArticleTagsModule } from '../article-tags/article-tags.module';
import { ArticlePartsModule } from '../article-parts/article-parts.module';
import { ArticleCardTypeDirective } from './article-card-type.directive';


@NgModule({
    declarations: [
        ArticleCardComponent,
        ArticleCardTypeDirective
    ],
    imports: [
        CommonModule,
        SppCardModule,
        ArticlePartsModule,
        ArticleTagsModule,
    ],
    exports: [
        ArticleCardComponent,
        ArticleCardTypeDirective
    ]
})
export class ArticleCardModule {
}
