import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { State } from '../../../../../store';
import { ArticlesViewBase } from '../articles-view.base';


@Component({
    selector: 'articles-default-view',
    templateUrl: './articles-default-view.component.html',
    styleUrls: ['./articles-default-view.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ArticlesDefaultViewComponent extends ArticlesViewBase {

    constructor(public store: Store<State>) {
        super(store);
    }
}
