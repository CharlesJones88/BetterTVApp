export class Movie {
    public id: number;
    public title: string;
    public release_year: number;
    public themoviedb: number;
    public original_title: string;
    public imdb: string;
    public pre_order: boolean;
    public in_theaters: boolean;
    public release_date: Date;
    public rating: string;
    public rottentomatoes: number;
    public freebase: string;
    public wikipedia_id: number;
    public metacritic: string;
    public common_sense_media: string;
    public poster_120x171: string;
    public poster_240x342: string;
    public poster_400x570: string;
    public alternate_titles: string[];
    public plot: string;
    public fullPlot: string;
    public rated: number;
    public genres: string[];
    
    constructor() {}

    getSmallImage(): string {
        return this.poster_120x171;
    }

    getMediumImage(): string {
        return this.poster_240x342;
    }

    getLargeImage(): string {
        return this.poster_400x570;
    }
}