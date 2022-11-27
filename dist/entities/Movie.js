"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Movie = void 0;
class Movie {
    constructor(id, title, tmdb_posterpath, overview, vote_count, vote_average) {
        this.id = id;
        this.title = title;
        this.tmdb_posterpath = tmdb_posterpath;
        this.overview = overview;
        this.vote_count = vote_count;
        this.vote_average = vote_average;
    }
}
exports.Movie = Movie;
