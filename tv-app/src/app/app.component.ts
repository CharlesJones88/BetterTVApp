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
  private ascending: boolean = true;
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
        this.videoService.getMoviesBySource(source.type, this.movieLimit, this.movieOffset)
        .then(value => {
          this.movies = value;
          this.movieList.push({source: source.display_name, movies: this.movies});
          this.movieList = _.sortBy(this.movieList, ['source']);
        });
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
        this.videoService.getShowsBySource(source.type, this.showLimit, this.showOffset)
        .then(value => {
          this.shows = value;
          this.showList.push({source: source.display_name, shows: this.shows});
          this.showList = _.sortBy(this.showList, ['source']);
        });
      });
      this.showOffset += this.showLimit;
    });
  }

  showTitleSort(list) {
    let sortOrder: string = this.ascending ? 'asc' : 'desc';
    list.shows = _.orderBy(list.shows, ['title'], [sortOrder]);
    this.ascending = !this.ascending;
  }

  movieTitleSort(list) {
    let sortOrder: string = this.ascending ? 'asc' : 'desc';
    list.movies = _.orderBy(list.movies, ['title'], [sortOrder]);
    this.ascending = !this.ascending;
  }

  movieRatingSort(list) {
    list.movies.sort((one, two) => this.ascending ? this.sortMovieAsc(one, two) : this.sortMovieDesc(one, two));
    this.ascending = !this.ascending;
  }

  movieScoreSort(list) {
    let sortOrder: string = this.ascending ? 'asc' : 'desc';
    list.movies = _.orderBy(list.movies, ['rated'], [sortOrder]);
    this.ascending = !this.ascending;
  }

  private getMovieRatings(): string[] {
    return this.videoService.getMovieRatings();
  }

  private sortMovieAsc(one, two): number {
    if(this.getMovieRatings().indexOf(one.rating) < this.getMovieRatings().indexOf(two.rating)) return -1;
    if(this.getMovieRatings().indexOf(one.rating) > this.getMovieRatings().indexOf(two.rating)) return 1;

    if(one.title < two.title) return -1;
    if(one.title > two.title) return 1;
    return 0;
  }

  private sortMovieDesc(one, two): number {
    if(this.getMovieRatings().indexOf(one.rating) < this.getMovieRatings().indexOf(two.rating)) return 1;
    if(this.getMovieRatings().indexOf(one.rating) > this.getMovieRatings().indexOf(two.rating)) return -1;
    
    if(one.title < two.title) return 1;
    if(one.title > two.title) return -1;
    return 0;
  }
}
