import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ArticleTagComponent } from './article-tag/article-tag.component';
import { ArticleTagsComponent } from './article-tags.component';


@NgModule({
    declarations: [
        ArticleTagComponent,
        ArticleTagsComponent
    ],
    imports: [
        CommonModule
    ],
    exports: [
        ArticleTagComponent,
        ArticleTagsComponent
    ]
})
export class ArticleTagsModule {
}
