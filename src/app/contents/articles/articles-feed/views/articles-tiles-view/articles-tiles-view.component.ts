import { Component } from '@angular/core';
import { ArticlesViewBase } from '../articles-view.base';
import { Store } from '@ngrx/store';
import { State } from '../../../../../store';


@Component({
    selector: 'articles-tiles-view',
    templateUrl: './articles-tiles-view.component.html',
    styleUrls: ['./articles-tiles-view.component.scss']
})
export class ArticlesTilesViewComponent extends ArticlesViewBase {

    cardType = 'tile';

    constructor(public store: Store<State>) {
        super(store);
    }
}
