import { Component, OnInit } from '@angular/core';
import { VideoService } from './video.service';
import { Movie } from './Movie';
import { Show } from './Show';
import * as _ from 'lodash';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [VideoService]
})
export class AppComponent implements OnInit {
  public movies: Movie[] = [];
  public shows: Show[] = [];
  public genres = [];
  private movieLimit: number = 10;
  private movieOffset: number = 0;
  private showLimit: number = 10;
  private showOffset: number = 0;
  constructor(private videoService: VideoService) {}

  ngOnInit(): void {
    this.videoService.getMovies(this.movieLimit, this.movieOffset).subscribe(value => this.movies = value);
    this.videoService.getShows(this.showLimit, this.showOffset).subscribe(value => this.shows = value);
    this.videoService.getGenres().subscribe(value => this.genres = value);
    this.movieOffset += this.movieLimit;
    this.showOffset += this.showLimit;
  }

  getGenres() {
    this.videoService.getGenres().subscribe(value => this.genres = value);
  }
  getMovies() {
    this.videoService.getMovies(this.movieLimit, this.movieOffset).subscribe(value => {console.log(value);this.movies = this.movies.concat(value);});
    this.movieOffset += this.movieLimit;
  }

  getShows() {
    this.videoService.getShows(this.showLimit, this.showOffset).subscribe(value => this.shows = this.shows.concat(value));
    this.showOffset += this.showLimit;
  }
}
