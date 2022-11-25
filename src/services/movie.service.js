import db from "../config/config";
import public_queries from "../queries/movie.queries";
import Helper from "../utils/helpers/helpers";

const {fetchResourceByPage, calcPages} = Helper
const { fetchAllMovies, searchMovieQuery, fetchMoviesCount } = public_queries;

export default class MovieService {
  /**
   * fetch all movies
   * @memberof MovieService
   */
  static async fetchAllMovies({ page = 1, limit = 10 }) {
    const [total, result] = await fetchResourceByPage({
      page,
      limit,
      getCount: fetchMoviesCount, //query to count all movies
      getResources: fetchAllMovies //query to get all the movies
     });

    return {
      total: +total.count,
      currentPage: +page,
      totalPages: calcPages(total.count, limit),
      result
    };
  }

  /**
   * fetch movies by name, genre, year
   * @memberof MovieService
   */
  static async fetchMovieByQuery(query) {
    const { title, year, genre } = query;
    return db.manyOrNone(searchMovieQuery, [`%${title}%`, year, `%${genre}%`]);
  }
}
