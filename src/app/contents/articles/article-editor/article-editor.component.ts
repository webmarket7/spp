import { Component, OnDestroy, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { omit } from 'lodash';
import { Title } from '@angular/platform-browser';
import { User } from '../../../common/models/user.interface';
import { GlobalService } from '../../../services/global.service';
import { of, Subscription, SubscriptionLike } from 'rxjs';
import { ArticlesService } from '../../../services/articles.service';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { FullArticle } from '../../../common/models/article.interface';


@Component({
    selector: 'article-editor',
    templateUrl: './article-editor.component.html',
    styleUrls: ['./article-editor.component.scss']
})
export class ArticleEditorComponent implements OnInit, OnDestroy {
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

    currentUser: User;
    articleIdSubscription: SubscriptionLike = Subscription.EMPTY;

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
        private location: Location,
        private activatedRoute: ActivatedRoute,
        private globalService: GlobalService,
        private articlesService: ArticlesService
    ) {
    }

    ngOnInit(): void {
        this.title.setTitle(this.header);
        this.currentUser = this.globalService.currentUser;

        this.articleIdSubscription = this.activatedRoute.paramMap.pipe(
            switchMap((paramMap: ParamMap) => {
                const articleId = paramMap.get('articleId');

                return articleId ? this.articlesService.getOne(articleId) : of(null);
            })
        )
            .subscribe((article: FullArticle) => {
                if (article) {
                    this.mode = 'update';
                    this.form.patchValue(article);
                } else {
                    this.mode = 'create';
                }
            });
    }

    ngOnDestroy(): void {
        this.articleIdSubscription.unsubscribe();
    }

    getTitleErrorMessage(): string {
        return this.titleControl.hasError('required') ? 'You must enter a value' : '';
    }

    getAnnotationErrorMessage(): string {
        return this.descriptionControl.hasError('required') ? 'You must enter a value' : '';
    }

    submitForm(form: FormGroup): void {
        if (form.valid) {
            if (this.mode === 'create') {
                const newArticle = this.articlesService.createFullArticle(omit(form.value, ['id']));

                this.articlesService.addOne(newArticle);
            } else if (this.mode === 'update') {
                this.articlesService.updateOne(form.value);
            }

            this.location.back();
        }
    }

    onCancel(event: MouseEvent) {
        event.stopPropagation();
        this.location.back();
    }
}
