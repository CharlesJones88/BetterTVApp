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
  public movieGenres: string[] = [];
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
          this.movies = value.movies;
          this.movieGenres = value.genres;
          _.each(this.movieGenres, (genre) => {
            let moviesMatchingGenre = this.movies.filter(movie => movie.genres.indexOf(genre) !== -1);
            if(this.movieList.find(category => category.genre === genre)) {
              this.movieList.find(category => category.genre === genre).movies 
                = _.uniqBy(this.movieList.find(category => category.genre === genre).movies
                                .concat(moviesMatchingGenre), 'title');
            } else {
              this.movieList.push({genre: genre, movies: moviesMatchingGenre});
            }
          });
          this.movieList = _.sortBy(this.movieList, ['genre']);
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
  showRatingSort(list) {
    list.shows.sort((one, two) => this.ascending ? this.sortShowAsc(one, two) : this.sortShowDesc(one, two));
    this.ascending = !this.ascending;
  }

  showScoreSort(list) {
    let sortOrder: string = this.ascending ? 'asc' : 'desc';
    list.shows = _.orderBy(list.shows, ['rated'], [sortOrder]);
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
  private getShowRatings(): string[] {
    return this.videoService.getShowRatings();
  }

  private sortShowAsc(one, two): number {
    if(this.getShowRatings().indexOf(one.rating) < this.getShowRatings().indexOf(two.rating)) return -1;
    if(this.getShowRatings().indexOf(one.rating) > this.getShowRatings().indexOf(two.rating)) return 1;

    if(one.title < two.title) return -1;
    if(one.title > two.title) return 1;
    return 0;
  }

  private sortShowDesc(one, two): number {
    if(this.getShowRatings().indexOf(one.rating) < this.getShowRatings().indexOf(two.rating)) return 1;
    if(this.getShowRatings().indexOf(one.rating) > this.getShowRatings().indexOf(two.rating)) return -1;

    if(one.title < two.title) return 1;
    if(one.title > two.title) return -1;
    return 0;
  }

}
