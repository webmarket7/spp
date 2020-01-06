import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SppIconComponent } from './spp-icon/spp-icon.component';
import { SppUserPicComponent } from './spp-user/spp-user-pic/spp-user-pic.component';

import { UserNamePipe } from './spp-user/pipes/user-name.pipe';
import { ArticleCardComponent } from './article-card/article-card.component';
import { ArticleAuthorComponent } from './article-parts/article-author/article-author.component';
import { ArticleLikesComponent } from './article-parts/article-likes/article-likes.component';
import { ArticleFavsComponent } from './article-parts/article-favs/article-favs.component';
import { ArticleTagsComponent } from './article-parts/article-tags/article-tags.component';
import { ArticleTagComponent } from './article-parts/article-tag/article-tag.component';
import { ArticleCommentEditorComponent } from './article-comment/article-comment-editor/article-comment-editor.component';
import { FormsModule } from '@angular/forms';
import { SppButtonComponent } from './spp-button/spp-button.component';
import { ArticleCommentCardComponent } from './article-comment/article-comment-card/article-comment-card.component';
import { ArticleCommentAuthorComponent } from './article-comment/article-comment-author/article-comment-author.component';

@NgModule({
    declarations: [
        AppComponent,
        SppIconComponent,
        SppUserPicComponent,

        UserNamePipe,

        ArticleCardComponent,

        ArticleAuthorComponent,

        ArticleLikesComponent,

        ArticleFavsComponent,

        ArticleTagsComponent,

        ArticleTagComponent,

        ArticleCommentEditorComponent,

        SppButtonComponent,

        ArticleCommentCardComponent,

        ArticleCommentAuthorComponent
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        FormsModule
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule {
}
