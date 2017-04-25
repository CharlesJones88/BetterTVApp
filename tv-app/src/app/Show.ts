export class Show {
    public id: number;
    public title: string;
    public container_show: number;
    public first_aired: Date;
    public imdb_id: string;
    public tvdb: number;
    public themoviedb: number;
    public freebase: string;
    public wikipedia_id: number;
    public artwork_208x117: string;
    public artwork_304x171: string;
    public artwork_448x252: string;
    public artwork_608x342: string;
    public alternate_titles: Object[];
    public plot: string;
    public rated: number;
    public genres: string[];
    public rating: string;
    public fullPlot: string;
    constructor() {}

    getSmallImage(): string {
        return this.artwork_208x117;
    }

    getMediumImage(): string {
        return this.artwork_304x171;
    }

    getLargeImage(): string {
        return this.artwork_448x252;
    }

    getXLargeImage(): string {
        return this.artwork_608x342;
    }
}
