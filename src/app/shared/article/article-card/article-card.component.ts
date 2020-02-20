import { ChangeDetectionStrategy, Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { FullArticle } from '../../../common/models/article.interface';
import { ArticleReactionsService } from '../../../services/article-reactions.service';
import { ArticleReactions } from '../../../common/models/article-reactions.inteface';
import { User } from '../../../common/models/user.interface';

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
        private articleReactionsService: ArticleReactionsService
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
        this.articleReactionsService.toggleReaction('likes', this.article.id)
            .subscribe((articleReactions: ArticleReactions) => {
                this.articleReactionsService.updateOne(articleReactions);
            });
    }

    toggleFav(): void {
        this.articleReactionsService.toggleReaction('stars', this.article.id)
            .subscribe((articleReactions: ArticleReactions) => {
                this.articleReactionsService.updateOne(articleReactions);
            });
    }
}
