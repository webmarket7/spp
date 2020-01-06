import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ArticleAuthorComponent } from './article-author/article-author.component';
import { ArticleLikesComponent } from './article-reactions/article-likes/article-likes.component';
import { ArticleFavsComponent } from './article-reactions/article-favs/article-favs.component';
import { SppIconModule } from '../../ui/spp-icon/spp-icon.module';
import { SppUserModule } from '../../ui/spp-user/spp-user.module';


@NgModule({
    declarations: [
        ArticleAuthorComponent,
        ArticleLikesComponent,
        ArticleFavsComponent,
    ],
    imports: [
        CommonModule,
        SppIconModule,
        SppUserModule
    ],
    exports: [
        ArticleAuthorComponent,
        ArticleLikesComponent,
        ArticleFavsComponent,
    ]
})
export class ArticlePartsModule {
}
