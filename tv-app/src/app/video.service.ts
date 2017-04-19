import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

import { Movie } from './Movie';
import { Show } from './Show';
import * as _ from 'lodash';

@Injectable()
export class VideoService {
    constructor(private http: Http) {

    }
    // getGenres(): Observable<Genre[]> {
    //     return this.http.get(`http://localhost:8080/api/v1/genres`)
    //                     .map(response => {
    //                         let res = response.json();
    //                         let genres = _.map(res, genre => {
    //                             let gen = new Genre();
    //                             Object.assign(gen, genre);
    //                             return gen;
    //                         });
    //                         return genres;
    //                     });
    // }
    getMovies(limit: number, offset: number): Observable<Movie[]> {
        return this.http.get(`http://localhost:8080/api/v1/movies/all?limit=${limit}&offset=${offset}`)
                        .map(response => {
                            let res = response.json();
                            let movies = _.map(res, movie => {
                                let mov = new Movie();
                                Object.assign(mov, movie);
                                return mov;
                            });
                            return movies;
                        });
    }
    // getMoviesByGenre(genre: string): Observable<Movie[]> {
    //     return this.http.get(`http://localhost:8080/api/v1/movies/genre?genre=${genre}`)
    //                     .map(response => {
    //                         let res = response.json();
    //                         let movies = _.map(res, movie => {
    //                             let mov = new Movie();
    //                             Object.assign(mov, movie);
    //                             return mov;
    //                         });
    //                         return movies;
    //                     });
    // }
    getShows(limit: number, offset: number): Observable<Show[]> {
        return this.http.get(`http://localhost:8080/api/v1/shows/all?limit=${limit}&offset=${offset}`)
                        .map(response => {
                            let res = response.json();
                            let shows = _.map(res, show => {
                                let sho = new Show();
                                Object.assign(sho, show);
                                return sho;
                            });
                            return shows;
                        });
    }
    // getShowsByGenre(genre: string): Observable<Show[]> {
    //     return this.http.get(`http://localhost:8080/api/v1/shows/genre?genre=${genre}`)
    //                     .map(response => {
    //                         let res = response.json();
    //                         let shows = _.map(res, show => {
    //                             let sho = new Show();
    //                             Object.assign(sho, show);
    //                             return sho;
    //                         });
    //                         return shows;
    //                     });
    // }
}