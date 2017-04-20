import { Component, Input } from '@angular/core';

import { Show } from './Show';

@Component({
    selector: 'show-detail',
    templateUrl: './show-detail.component.html',
    styles: [
        'h2 {text-align: center}',
        `img {     
            margin-left: auto;
            margin-right: auto;
            display: block;
        }`,
        `.show-cards {
            padding: 0px;
            margin-left: 15px;
            margin-right: 15px;
        }`
    ]
})
export class ShowDetailComponent {
    @Input() show: Show;
}