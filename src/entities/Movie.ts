export class Movie {
  constructor(
    private id: number,
    private title: string,
    private tmdb_posterpath: string,
    private overview: string,
    private vote_count: string,
    private vote_average: string
  ) {}
}
