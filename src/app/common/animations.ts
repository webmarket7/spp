import { animate, state, style, transition, trigger } from '@angular/animations';

export const filterAnimation = trigger('popupState', [
    state('void', style({
        opacity: 0,
        transform: 'translateY(-30%)'
    })),
    state('*', style({
        opacity: 1,
        transform: 'translateX(0)'
    })),
    transition('void => *', animate('200ms ease-in')),
    transition('* => void', animate('300ms ease-out'))
]);
