import db from "../config/config";
import public_queries from "../queries/public_queries";

const {
  fetchMoviesByPage,
  fetchAllMovies,
  fetchMovieByTitle,
  fetchMovieByRating,
  fetchMovieByGenre,
  fetchMovieByYear,
} = public_queries;

export default class PublicService {
  /**
   * fetch all movies
   * @memberof PublicService
   */
  static async fetchAllMovies() {
    return db.any(fetchAllMovies);
  }

  /**
   * fetch movies by page
   * @memberof PublicService
   */
  static async fetchMoviesByPage(data) {
    let { page } = data;
    return db.any(fetchMoviesByPage, [page]);
  }

  /**
   * fetch movies by name
   * @memberof PublicService
   */
  static async fetchMovieByTitle(data) {
    let { title } = data;
    return db.any(fetchMovieByTitle, [`%${title}%`]);
  }

  /**
   * fetch movies by rating
   * @memberof PublicService
   */
  static async fetchMovieByRating(data) {
    let { rating } = data;
    return db.manyOrNone(fetchMovieByRating, [rating, `${rating}.9`]);
  }

  /**
   * fetch movies by genre
   * @memberof PublicService
   */
  static async fetchMovieByGenre(data) {
    let { genre } = data;
    return db.manyOrNone(fetchMovieByGenre, [`%${genre}`]);
  }

  static async fetchMovieByYear(data) {
    let { year } = data;
    return db.manyOrNone(fetchMovieByYear, [year]);
  }
}
