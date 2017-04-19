import { Component, Input } from '@angular/core';

import { Show } from './Show';

@Component({
    selector: 'show-detail',
    templateUrl: './show-detail.component.html'
})
export class ShowDetailComponent {
    @Input() show: Show;
    constructor() {}
}