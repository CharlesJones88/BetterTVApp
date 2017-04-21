import { Component, Input } from '@angular/core';
import { MdDialog } from '@angular/material';

import { Movie } from './Movie';
import { VideoService } from './video.service';
import { MovieDetailDialog } from './movie-detail.dialog';

@Component({
    selector: 'movie-detail',
    templateUrl: './movie-detail.component.html',
    styleUrls: ['./movie-detail.component.css']
})
export class MovieDetailComponent {
    @Input() movie: Movie;

    constructor(public dialog: MdDialog, private videoService: VideoService) {}
    getGenres(): string {
        return this.movie.genres.join(', ');
    }

    openDialog() {
        this.videoService.getMovie(this.movie.imdb, true).then(value => {
            let dialogRef = this.dialog.open(MovieDetailDialog);
            this.movie.fullPlot = value.plot;
            dialogRef.componentInstance.movie = this.movie;
        });
    }
}