import { Component, OnInit } from '@angular/core';
import { VideoService } from './video.service';
import { Movie } from './Movie';
import { Show } from './Show';
import { Source } from './Source';
import * as _ from 'lodash';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [VideoService]
})
export class AppComponent implements OnInit {
  public movies: Movie[] = [];
  public movieList = [];
  public showList = [];
  public shows: Show[] = [];
  private movieLimit: number = 20;
  private movieOffset: number = 0;
  private showLimit: number = 20;
  private showOffset: number = 0;
  constructor(private videoService: VideoService) {}

  ngOnInit(): void {
    this.videoService.getMoviesSources().then(value => {
      let sources: Source[] = _.uniqBy(_.map(value, val => {
        let source = new Source();
        Object.assign(source, {display_name: val.display_name, type: val.type});
        return source;
      }), 'type');
      _.each(sources, source => {
        this.videoService.getMovies(source.type, this.movieLimit, this.movieOffset)
        .then(value => {
          this.movies = value;
          this.movieList.push({source: source.display_name, movies: this.movies});
        });
        this.showList = _.sortBy(this.showList, ['display_name']);
      });
      this.movieOffset += this.movieLimit;
    });
    this.videoService.getShowSources().then(value => {
      let sources: Source[] = _.uniqBy(_.map(value, val => {
        let source = new Source();
        Object.assign(source, {display_name: val.display_name, type: val.type});
        return source;
      }), 'type');
      _.each(sources, source => {
        this.videoService.getShows(source.type, this.showLimit, this.showOffset)
        .then(value => {
          this.shows = value;
          this.showList.push({source: source.display_name, shows: this.shows});
        });
        this.showList = _.sortBy(this.showList, ['display_name']);
      });
      this.showOffset += this.showLimit;
    });
  }

  getMovies() {
    // this.videoService.getMovies(this.movieLimit, this.movieOffset).subscribe(value => {console.log(value);this.movies = this.movies.concat(value);});
    this.movieOffset += this.movieLimit;
  }

  getShows() {
    // this.videoService.getShows(this.showLimit, this.showOffset).subscribe(value => this.shows = this.shows.concat(value));
    this.showOffset += this.showLimit;
  }
}
