import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

@Component({
    selector: 'spp-card',
    templateUrl: './spp-card.component.html',
    styleUrls: ['./spp-card.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class SppCardComponent implements OnInit {

    constructor() {
    }

    ngOnInit(): void {
    }
}
