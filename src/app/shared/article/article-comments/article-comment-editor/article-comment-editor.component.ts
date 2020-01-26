import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
    selector: 'article-comment-editor',
    templateUrl: './article-comment-editor.component.html',
    styleUrls: ['./article-comment-editor.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ArticleCommentEditorComponent {
    text = '';

    @Input() expanded = false;

    @Output() save: EventEmitter<string> = new EventEmitter<string>();

    constructor() {
    }

    resetForm(): void {
        this.text = '';
    }

    saveComment(event: MouseEvent): void {
        this.save.emit(this.text);
        this.resetForm();
    }

    cancel($event: MouseEvent): void {
        this.resetForm();
    }
}
