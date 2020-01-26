import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ArticleCommentAuthorComponent } from './article-comment-author/article-comment-author.component';
import { ArticleCommentEditorComponent } from './article-comment-editor/article-comment-editor.component';
import { ArticleCommentCardComponent } from './article-comment-card/article-comment-card.component';
import { FormsModule } from '@angular/forms';


@NgModule({
    declarations: [
        ArticleCommentAuthorComponent,
        ArticleCommentEditorComponent,
        ArticleCommentCardComponent
    ],
    imports: [
        CommonModule,
        FormsModule
    ],
    exports: [
        ArticleCommentEditorComponent,
        ArticleCommentCardComponent
    ]
})
export class ArticleCommentsModule {
}
