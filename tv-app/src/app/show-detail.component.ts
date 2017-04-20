import { Component, Input } from '@angular/core';

import { Show } from './Show';

@Component({
    selector: 'show-detail',
    templateUrl: './show-detail.component.html',
    styles: [
        'p {text-align: left}',
        `img {     
            margin-left: auto;
            margin-right: auto;
            display: block;
        }`,
        `.show-cards { 
            width: 325px;
            padding: 0px;
            margin-left: 15px;
            margin-right: 15px;
        }`,
          `.bold {
            font-weight: bold;
        }`
    ]
})
export class ShowDetailComponent {
    @Input() show: Show;
}
