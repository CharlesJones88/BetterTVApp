import { Component } from '@angular/core';
import { MdDialogRef } from '@angular/material';

import { Movie } from './Movie';

@Component({
    selector: 'movie-detail-dialog',
    templateUrl: './movie-detail.dialog.html',
    styles: [
        `.full-plot {
            width: 510px;
        }`
    ]
})
export class MovieDetailDialog {
    public movie: Movie
}