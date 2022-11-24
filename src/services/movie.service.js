import db from "../config/config";
import public_queries from "../queries/movie.queries";

const { fetchAllMovies, searchMovieQuery, fetchMovieByID } = public_queries;

export default class MovieService {
  /**
   * fetch all movies
   * @memberof MovieService
   */
  static async fetchAllMovies() {
    return db.any(fetchAllMovies);
  }

  /**
   * fetch movies by name, genre, year
   * @memberof MovieService
   */
  static async fetchMovieByQuery(query) {
    const { title, year, genre } = query;
    return db.any(searchMovieQuery, [`%${title}%`, year, `%${genre}`]);
  }
}