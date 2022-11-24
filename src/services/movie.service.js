import db from "../config/config";
import public_queries from "../queries/movie.queries";

const {
  fetchMoviesByPage,
  fetchAllMovies,
  fetchMovieByTitle,
  fetchMovieByRating,
  fetchMovieByGenre,
  fetchMovieByYear,
} = public_queries;

export default class MovieService {

  /**
   * fetch all movies
   * @memberof MovieService
   */
  static async fetchAllMovies() {
    return db.any(fetchAllMovies);
  }

  // /**
  //  * fetch movies by page
  //  * @memberof MovieService
  //  */
  // static async fetchMoviesByPage(data) {
  //   const { limit, page } = data;
  //   console.log("Data", data)
  //   return db.any(fetchMoviesByPage, [limit, page]);
  // }

  // /**
  //  * fetch movies by name
  //  * @memberof MovieService
  //  */
  // static async fetchMovieByTitle(data) {
  //   let { title } = data;
  //   return db.any(fetchMovieByTitle, [`%${title}%`]);
  // }

  // /**
  //  * fetch movies by rating
  //  * @memberof MovieService
  //  */
  // static async fetchMovieByRating(data) {
  //   let { rating } = data;
  //   return db.manyOrNone(fetchMovieByRating, [rating, `${rating}.9`]);
  // }

  // /**
  //  * fetch movies by genre
  //  * @memberof MovieService
  //  */
  // static async fetchMovieByGenre(data) {
  //   let { genre } = data;
  //   return db.manyOrNone(fetchMovieByGenre, [`%${genre}`]);
  // }

  // /**
  //  * fetch movies by year
  //  * @memberof MovieService
  //  */
  // static async fetchMovieByYear(data) {
  //   let { year } = data;
  //   return db.manyOrNone(fetchMovieByYear, [year]);
  // }
}
