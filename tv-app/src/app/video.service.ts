import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/toPromise';

import { Movie } from './Movie';
import { Show } from './Show';
import { Source } from './Source';
import * as _ from 'lodash';

@Injectable()
export class VideoService {
    constructor(private http: Http) {}

    getMoviesSources(): Promise<Source[]> {
        return this.http.get(`/api/v1/movies/sources`)
                        .toPromise()
                        .then(response => response.json());
    }

    getMoviesBySource(source: string, limit: number, offset: number): Promise<any> {
        return this.http.get(`/api/v1/movies/all?source=${source}&limit=${limit}&offset=${offset}`)
                        .toPromise()
                        .then(response => {
                            let res = response.json();
                            res.movies = _.map(res.movies, movie => {
                                let mov = new Movie();
                                Object.assign(mov, movie);
                                return mov;
                            });
                            return res;
                        });
    }

    getMovie(id: string): Promise<Movie> {
        return this.http.get(`/api/v1/movies/movie?id=${id}`)
                        .toPromise()
                        .then(response => {
                            let res = response.json();
                            let movie = new Movie();
                            Object.assign(movie, res);
                            return movie;
                        });
    }

    getMovies(limit: number, offset: number): Promise<Movie[]> {
        return this.http.get(`/api/v1/movies/all?limit=${limit}&offset=${offset}`)
                        .toPromise()
                        .then(response => response.json());
    }

    getShowSources(): Promise<Source[]> {
        return this.http.get(`/api/v1/shows/sources`)
                        .toPromise()
                        .then(response => response.json());
    }

    getShowsBySource(source: string, limit: number, offset: number): Promise<any> {
        return this.http.get(`/api/v1/shows/all?source=${source}&limit=${limit}&offset=${offset}`)
                        .toPromise()
                        .then(response => {
                            let res = response.json();
                            res.shows = _.map(res.shows, show => {
                                let sho = new Show();
                                Object.assign(sho, show);
                                return sho;
                            });
                            return res;
                        });
    }

    getShows(limit: number, offset: number): Promise<any> {
        return this.http.get(`/api/v1/shows/all?limit=${limit}&offset=${offset}`)
                        .toPromise()
                        .then(response => response.json());
    }

    getShow(id: string): Promise<Show> {
      return this.http.get(`/api/v1/shows/show?id=${id}`)
        .toPromise()
        .then(response => {
          let res = response.json();
          let show = new Show();
          Object.assign(show, res);
          return show;
        });
    }

    getMovieRatings() {
        return ["G", "PG", "PG-13", "R", "NR"];
    }
    getShowRatings() {
      return ["TV-PG","TV-14","TV-MA","R","N/A"];
    }
}

