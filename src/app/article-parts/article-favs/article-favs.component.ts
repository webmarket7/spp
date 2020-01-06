import { ChangeDetectionStrategy, Component, EventEmitter, HostBinding, Input, Output } from '@angular/core';

@Component({
    selector: 'article-favs',
    templateUrl: './article-favs.component.html',
    styleUrls: ['./article-favs.component.scss', '../styles/article-reactions.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ArticleFavsComponent {
    @HostBinding('class.active') @Input() fav: boolean;
    @Input() favs: number;

    @Output() toggle: EventEmitter<void> = new EventEmitter<void>();

    toggleFav(event: MouseEvent) {
        event.stopPropagation();
        this.toggle.emit();
    }
}
