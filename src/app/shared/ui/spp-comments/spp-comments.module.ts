import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TextFieldModule } from '@angular/cdk/text-field';
import { SppCommentComponent } from './spp-comment/spp-comment.component';
import { SppCommentEditorComponent } from './spp-comment-editor/spp-comment-editor.component';
import { SppUserModule } from '../spp-user/spp-user.module';
import { ReactiveFormsModule } from '@angular/forms';
import { SppCommentAuthorComponent } from './spp-comment-author/spp-comment-author.component';
import { SppButtonModule } from '../spp-button/spp-button.module';
import { MatMenuModule } from '@angular/material';
import { SppIconModule } from '../spp-icon/spp-icon.module';


@NgModule({
    declarations: [
        SppCommentComponent,
        SppCommentEditorComponent,
        SppCommentAuthorComponent
    ],
    imports: [
        CommonModule,
        ReactiveFormsModule,
        TextFieldModule,
        SppUserModule,
        SppButtonModule,
        SppIconModule,
        MatMenuModule
    ],
    exports: [
        SppCommentComponent,
        SppCommentEditorComponent
    ]
})
export class SppCommentsModule {
}
