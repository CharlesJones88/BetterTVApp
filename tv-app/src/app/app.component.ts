import { Component, OnInit } from '@angular/core';
import { MdDialog } from '@angular/material';

import { MovieDetailDialog } from './movie-detail.dialog';
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
  public loading: boolean;
  private ascending: boolean = true;
  public movies: Movie[] = [];
  public movieList = [];
  public filteredMovieList = [];
  public movieGenres: string[] = [];
  public shows: Show[] = [];
  public showList = [];
  public filteredShowList = [];
  private movieLimit: number = 20;
  private movieOffset: number = 0;
  private showLimit: number = 20;
  private showOffset: number = 0;
  public selectedRatings = [];
  constructor(public dialog: MdDialog, private videoService: VideoService) {}

  ngOnInit(): void {
    this.loading = true;
    Promise.all(this.getMoviesByGenre().concat(this.getShowsByGenre())).then(() => {
      this.loading = false;
    });
  }

  openMovieDialog(movie) {
    this.videoService.getMovie(movie.imdb, true).then(value => {
      let dialogRef = this.dialog.open(MovieDetailDialog);
      movie.fullPlot = value.plot;
      dialogRef.componentInstance.movie = movie;
      dialogRef.afterClosed().subscribe(result => {
        if(result) {
          _.each(this.filteredMovieList, item => {
            let index = _.findIndex(item.movies, (movie: Movie) => movie.id === result.id);
            item.movies.splice(index, 1);
          });
          this.movieList = this.filteredMovieList;
        }
      });
    });
  }

  private getMoviesByGenre(): Promise<any>[] {
    let moviePromises = [];
    let movieSourcePromise = new Promise((resolveSource, rejectSource) => {
      this.videoService.getMoviesSources().then(value => {
        let sources: Source[] = _.uniqBy(_.map(value, val => {
          let source = new Source();
          Object.assign(source, {display_name: val.display_name, type: val.type});
          return source;
        }), 'type');
        _.each(sources, source => {
          let moviePromise = new Promise((resolve, reject) => {
            this.videoService.getMoviesBySource(source.type, this.movieLimit, this.movieOffset).then(value => {
              this.movies = value.movies;
              this.movieGenres = value.genres;
              _.each(this.movieGenres, (genre) => {
                let moviesMatchingGenre = this.movies.filter(movie => movie.genres.indexOf(genre) !== -1);
                if(localStorage.getItem('hidden-movies')) {
                  let hiddenMovies = JSON.parse(localStorage.getItem('hidden-movies'));
                  _.each(hiddenMovies, (hidden) => {
                    moviesMatchingGenre = _.reject(moviesMatchingGenre, (movie) => movie.imdb === hidden);
                  });
                }
                if(this.movieList.find(category => category.genre === genre)) {
                  this.movieList.find(category => category.genre === genre).movies
                    = _.uniqBy(this.movieList.find(category => category.genre === genre).movies
                      .concat(moviesMatchingGenre), 'title');
                } else {
                  this.movieList.push({genre: genre, movies: moviesMatchingGenre});
                }
              });
              this.movieList = _.sortBy(this.movieList, ['genre']);
              this.filteredMovieList = _.cloneDeep(this.movieList);
              resolve();
              resolveSource();
            });
          });
          moviePromises.push(moviePromise);
        });
        this.movieOffset += this.movieLimit;
      });
    });
    moviePromises.push(movieSourcePromise);
    return moviePromises;
  }

  private getShowsByGenre(): Promise<any>[] {
    let showPromises = [];
    let showSourcePromise = new Promise((resolveSource, rejectSource) => {
      this.videoService.getShowSources().then(value => {
        let sources: Source[] = _.uniqBy(_.map(value, val => {
          let source = new Source();
          Object.assign(source, {display_name: val.display_name, type: val.type});
          return source;
        }), 'type');
        _.each(sources, source => {
          let showPromise = new Promise((resolve, reject) => {
            this.videoService.getShowsBySource(source.type, this.showLimit, this.showOffset)
            .then(value => {
              this.shows = value;
              this.showList.push({source: source.display_name, shows: this.shows});
              this.showList = _.sortBy(this.showList, ['source']);
              resolve();
              resolveSource();
            });
          });
          showPromises.push(showPromise);
        });
        this.showOffset += this.showLimit;
      });
    });
    showPromises.push(showSourcePromise);
    return showPromises;
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

  getMovieRatings(): string[] {
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

  getShowRatings(): string[] {
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

  filterMovieRatings(item, index) {
    item.movies = _.cloneDeep(this.movieList[index].movies);
    if(this.selectedRatings[index].length > 0) {
      item.movies = _.filter(item.movies, (movie: Movie) =>
        this.selectedRatings[index].indexOf(movie.rating) !== -1);
    }
  }


  filterShowRatings(item, index) {
    item.show = _.cloneDeep(this.showList[index].show);
    if(this.selectedRatings[index].length > 0) {
      item.shows = _.filter(item.shows, (show: Show) =>
      this.selectedRatings[index].indexOf(show.rating) !== -1);
    }
  }
}
