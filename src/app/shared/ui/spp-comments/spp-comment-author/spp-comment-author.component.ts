import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { User } from '../../../../store/user/user.model';

@Component({
    selector: 'spp-comment-author',
    templateUrl: './spp-comment-author.component.html',
    styleUrls: ['./spp-comment-author.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class SppCommentAuthorComponent {
    @Input() author: User;
    @Input() nameHidden: boolean;
}
