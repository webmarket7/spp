import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
    selector: 'article-date',
    templateUrl: './article-date.component.html',
    styleUrls: ['./article-date.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ArticleDateComponent {
    @Input() updatedDate: Date;
}
