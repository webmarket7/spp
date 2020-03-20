import { ChangeDetectionStrategy, Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { Store } from '@ngrx/store';

import { State } from '../../../store';
import { toggleArticleFav, toggleArticleLike } from '../../../store/article-reaction/article-reaction.actions';
import { User } from '../../../store/user/user.model';
import { FullArticle } from '../../../store/article/article.model';


@Component({
    selector: 'article-card',
    templateUrl: './article-card.component.html',
    styleUrls: ['./article-card.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ArticleCardComponent implements OnChanges {
    @Input() article: FullArticle;
    @Input() currentUser: User;

    likesCount = 0;
    liked = false;

    favsCount = 0;
    favorite = false;

    constructor(
        private store: Store<State>
    ) {
    }

    ngOnChanges(changes: SimpleChanges): void {
        const {article} = changes;

        if (article) {
            const currentValue = article.currentValue;

            if (currentValue) {
                const {reactionsCounts, reactionsAuthors} = currentValue;

                if (reactionsCounts) {
                    this.likesCount = reactionsCounts.likes;
                    this.favsCount = reactionsCounts.stars;
                }

                if (reactionsAuthors && this.currentUser) {
                    const currentUserId = this.currentUser.id;

                    this.liked = reactionsAuthors.likes.includes(currentUserId);
                    this.favorite = reactionsAuthors.stars.includes(currentUserId);
                }
            }
        }
    }

    toggleLike(): void {
        this.store.dispatch(toggleArticleLike({articleId: this.article.id}));
    }

    toggleFav(): void {
        this.store.dispatch(toggleArticleFav({articleId: this.article.id}));
    }
}
