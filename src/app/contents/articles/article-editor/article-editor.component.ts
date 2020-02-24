import { Component, OnDestroy, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { omit, random } from 'lodash';
import { Title } from '@angular/platform-browser';
import { of, Subscription, SubscriptionLike } from 'rxjs';
import { ArticlesService } from '../../../services/articles.service';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { Article, FullArticle } from '../../../common/models/article.interface';


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
        image: [`https://picsum.photos/640/480?random=${random(0, 100)}`, Validators.required]
    });

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

    constructor(
        private title: Title,
        private fb: FormBuilder,
        private location: Location,
        private activatedRoute: ActivatedRoute,
        private articlesService: ArticlesService
    ) {
    }

    ngOnInit(): void {
        this.title.setTitle(this.header);

        this.articleIdSubscription = this.activatedRoute.paramMap.pipe(
            switchMap((paramMap: ParamMap) => {
                const articleId = paramMap.get('articleId');

                return articleId ? this.articlesService.getArticleById(articleId) : of(null);
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
            switch (this.mode) {
                case 'create':
                    this.articlesService
                        .createArticle(omit(form.value, ['id']))
                        .subscribe((article: Article) => {
                            this.articlesService.addOne(article);
                            this.location.back();
                        });
                    break;
                case 'update':
                    this.articlesService.updateArticle(form.value.id, form.value).subscribe((article: Article) => {
                        this.articlesService.updateOne(article);
                        this.location.back();
                    });
                    break;
            }
        }
    }

    onCancel(event: MouseEvent) {
        event.stopPropagation();
        this.location.back();
    }
}
