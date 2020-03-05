import { Directive, HostBinding, Input } from '@angular/core';

@Directive({
    selector: '[articleCardType]'
})
export class ArticleCardTypeDirective {

    @HostBinding('class.list-item') listItem: boolean;
    @HostBinding('class.tile') tile: boolean;
    @HostBinding('class.wide') wide: boolean;

    @Input('articleCardType') set index(index: number) {
        const seq = index + 1;
        const first = seq === 1;
        const everySixth = seq % 6 === 0;
        const everySeventh = seq % 7 === 0;

        this.listItem = first || everySeventh;
        this.tile = !this.listItem;
        this.wide = first || everySixth || everySeventh;
    }

    constructor() {
    }
}
