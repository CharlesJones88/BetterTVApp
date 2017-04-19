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
        `.tile-spacing {
            margin-left: 15px;
            marging-right: 15px;
        }`
    ]
})
export class MovieDetailComponent {
    @Input() movie: Movie;
}