import { Component } from '@angular/core';
import { MdDialogRef } from '@angular/material';

import { Movie } from './Movie';

@Component({
    selector: 'movie-detail-dialog',
    templateUrl: './movie-detail.dialog.html',
    styles: [
        `.dialog-text-width {
            width:510px;
        }`,
        `.title {
            margin-top: 0;
            margin-bottom: 0;
        }`,
        `.img-space {
            margin-right: 5px;
        }`
    ]
})
export class MovieDetailDialog {
    public movie: Movie
    constructor(public dialogRef: MdDialogRef<MovieDetailDialog>) {}
    hideMovie() {
        let hiddenMovies = [];
        if(localStorage.getItem('hidden-movies')) {
            hiddenMovies = JSON.parse(localStorage.getItem('hidden-movies'));
        }
        hiddenMovies.push(this.movie.imdb);
        localStorage.setItem('hidden-movies', JSON.stringify(hiddenMovies));
        this.dialogRef.close(this.movie);
    }
}