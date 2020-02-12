import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { omit, random } from 'lodash';
import { Title } from '@angular/platform-browser';
import { User } from '../../../common/models/user.interface';
import { UserMock } from '../../../common/mocks/user.mock';
import { ArticleTag } from '../../../common/models/article-tag.interface';
import { articleTagsMock } from '../../../common/mocks/article-tags.mock';
import { fullArticlesList } from '../../../common/mocks/article.mock';


@Component({
    selector: 'article-editor',
    templateUrl: './article-editor.component.html',
    styleUrls: ['./article-editor.component.scss']
})
export class ArticleEditorComponent implements OnInit {
    mode: 'create' | 'update' = 'create';

    editorConfig = {
        base_url: '/tinymce',
        suffix: '.min',
        plugins: 'lists advlist',
        toolbar: 'undo redo | bold italic | bullist numlist outdent indent'
    };

    form: FormGroup = this.fb.group({
        id: null,
        title: ['', Validators.required],
        description: ['', Validators.required],
        text: ['', Validators.required],
        tags: [[], Validators.required],
        image: ['', Validators.required]
    });

    currentUser: User = new UserMock(null, 'Markus', 'Weir');
    tags: ArticleTag[] = [];

    get header() {
        return this.mode === 'create' ? 'Create new article' : 'Edit article';
    }

    get submitButtonLabel() {
        return this.mode === 'create' ? 'Create article' : 'Save changes';
    }

    get titleControl(): AbstractControl {
        return this.form.get('title');
    }

    get descriptionControl(): AbstractControl {
        return this.form.get('description');
    }

    get textControl(): AbstractControl {
        return this.form.get('text');
    }

    constructor(
        private title: Title,
        private fb: FormBuilder,
        private location: Location
    ) {
    }

    ngOnInit(): void {
        this.title.setTitle(this.header);
        this.tags = articleTagsMock;
        this.form.patchValue(fullArticlesList[0]);
    }

    getTitleErrorMessage(): string {
        return this.titleControl.hasError('required') ? 'You must enter a value' : '';
    }

    getAnnotationErrorMessage(): string {
        return this.descriptionControl.hasError('required') ? 'You must enter a value' : '';
    }

    submitForm(form: FormGroup): void {
        if (form.valid) {
            const formValue = omit(form.value, ['id']);

            console.log({formValue});
        }
    }

    onCancel(event: MouseEvent) {
        event.stopPropagation();
        this.location.back();
    }
}
