export interface FavoriteMoviesCRUD {
  getFavoriteMovie: (idList: number, idUser: number) => Promise<any>
  addFavoriteMovie: (idMovie: number, idUser: number) => Promise<any>
  removeFavoriteMovie: (idMovie: number, idUser: number) => Promise<any>
  createListFavoriteMovie: (idUser: number) => Promise<any>
}
