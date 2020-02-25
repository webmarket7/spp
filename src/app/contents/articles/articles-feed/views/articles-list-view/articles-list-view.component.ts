import { Component } from '@angular/core';
import { ArticlesViewBase } from '../articles-view.base';
import { Store } from '@ngrx/store';
import { State } from '../../../../../store';


@Component({
    selector: 'articles-list-view',
    templateUrl: './articles-list-view.component.html',
    styleUrls: ['./articles-list-view.component.scss']
})
export class ArticlesListViewComponent extends ArticlesViewBase {

    cardType = 'list-item';

    constructor(public store: Store<State>) {
        super(store);
    }
}



