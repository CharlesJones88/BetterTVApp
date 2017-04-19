import { Component, Input } from '@angular/core';

import { Movie } from './Movie';

@Component({
    selector: 'movie-detail',
    templateUrl: './movie-detail.component.html'
})
export class MovieDetailComponent {
    @Input() movie: Movie;
    constructor() {}
}