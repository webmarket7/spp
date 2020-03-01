import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { OverlayModule } from '@angular/cdk/overlay';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { EditorModule } from '@tinymce/tinymce-angular';

import { ArticleEditorRoutingModule } from './article-editor-routing.module';
import { SppCardModule } from '../../../shared/ui/spp-card/spp-card.module';
import { MatFormFieldModule, MatInputModule } from '@angular/material';
import { SppPageLayoutModule } from '../../../shared/ui/spp-page-layout/spp-page-layout.module';
import { SppButtonModule } from '../../../shared/ui/spp-button/spp-button.module';
import { SppListModule } from '../../../shared/ui/spp-list/spp-list.module';
import { SppIconModule } from '../../../shared/ui/spp-icon/spp-icon.module';
import { ArticleTagsModule } from '../../../shared/article/article-tags/article-tags.module';
import { ArticleEditorComponent } from './article-editor.component';
import { ArticleTagsSelectorComponent } from './article-tags-selector/article-tags-selector.component';
import { ImageUploaderModule } from '../../../shared/ui/image-uploader/image-uploader.module';
import { ArticleEditorEffects } from './store/article-editor.effects';
import * as fromArticleEditor from './store/article-editor.reducer';


@NgModule({
    declarations: [
        ArticleEditorComponent,
        ArticleTagsSelectorComponent
    ],
    imports: [
        CommonModule,
        ArticleEditorRoutingModule,
        ReactiveFormsModule,
        OverlayModule,
        MatFormFieldModule,
        MatInputModule,
        SppCardModule,
        SppPageLayoutModule,
        SppButtonModule,
        SppListModule,
        ArticleTagsModule,
        SppIconModule,
        EditorModule,
        ImageUploaderModule,
        StoreModule.forFeature(fromArticleEditor.articleEditorFeatureKey, fromArticleEditor.reducer),
        EffectsModule.forFeature([ArticleEditorEffects]),
    ]
})
export class ArticleEditorModule {
}
