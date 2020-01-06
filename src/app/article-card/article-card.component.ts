import { ChangeDetectionStrategy, Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { FullArticle } from '../common/models/article.interface';

@Component({
    selector: 'article-card',
    templateUrl: './article-card.component.html',
    styleUrls: ['./article-card.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ArticleCardComponent implements OnChanges {
    @Input() article: FullArticle;

    likesCount = 0;
    liked = false;

    favsCount = 0;
    favorite = false;

    constructor() {}

    ngOnChanges(changes: SimpleChanges): void {
        const { article } = changes;

        if (article) {
            const currentValue = article.currentValue;

            if (currentValue) {
                this.likesCount = currentValue.reactionsCounts.likes;
                this.favsCount = currentValue.reactionsCounts.stars;
            }
        }
    }

    toggleLike(): void {
        this.liked = !this.liked;
        this.likesCount += this.liked ? 1 : -1;
    }

    toggleFav(): void {
        this.favorite = !this.favorite;
        this.favsCount += this.favorite ? 1 : -1;
    }
}
