import { Component, Input } from '@angular/core';

import { Movie } from './Movie';

@Component({
    selector: 'movie-detail',
    templateUrl: './movie-detail.component.html',
    styles: [
        'h2 {text-align: center;}',
        `img {     
            margin-left: auto;
            margin-right: auto;
            display: block;
        }`,
        `.movie-cards {
            width: 240px;
            padding: 0px;
            margin-left: 15px;
            margin-right: 15px;
            padding-bottom: 40px;
        }`,
        `.content {
            position: absolute;
        }`
    ]
})
export class MovieDetailComponent {
    @Input() movie: Movie;
}