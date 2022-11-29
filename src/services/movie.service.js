import db from "../config/config";
import movie_queries from "../queries/movie.queries";
import Helper from "../utils/helpers/helpers";

const { fetchResourceByPage, calcPages } = Helper;
const {
  fetchAllMovies,
  searchMovieQuery,
  searchMovieCount,
  fetchMoviesCount,
  fetchMovieByID,
  rateMovie,
  addMovie,
  removeMovie,
  reviewMovie
} = movie_queries;

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
      getResources: fetchAllMovies, //query to get all the movies
    });

    return {
      total: +total.count,
      currentPage: +page,
      totalPages: calcPages(total.count, limit),
      result,
    };
  }

  /**
   * fetch movies by name, genre, year
   * @memberof MovieService
   */
  static async fetchMovieByQuery({ page = 1, limit = 10, title, year, genre }) {
    const [total, result] = await fetchResourceByPage({
      page,
      limit,
      getCount: searchMovieCount, //query to count all movies
      getResources: searchMovieQuery, //query to get all the movies
      params: [`%${title}%`, year, `%${genre}%`],
      countParams: [`%${title}%`, year, `%${genre}%`],
    });

    return {
      total: +total.count,
      currentPage: +page,
      totalPages: calcPages(total.count, limit),
      result,
    };
  }

  /**
   * fetch movies by query || get all movies
   * @memberof MovieService
   */
  static async getMovies({ page, limit, title, genre, year }) {
    return title || genre || year
      ? MovieService.fetchMovieByQuery({ page, limit, title, genre, year })
      : MovieService.fetchAllMovies({ page, limit });
  }

  /**
   * add movie
   * @memberof MovieService
   */
  static async addMovie(data) {
    const { title, genre, year } = data;
    return db.none(addMovie, [title, genre, year]);
  }

  /**
   * delete movie
   * @memberof MovieService
   */
  static async removeMovie(params) {
    const { id } = params;
    return db.none(removeMovie, [id]);
  }

  /**
   * returns movie with given ID
   * @memberof MovieService
   */
  static async getMovieByID(params) {
    const { id } = params;
    return db.oneOrNone(fetchMovieByID, [id]);
  }

  /**
   * rate movie with given ID
   * @memberof MovieService
   */
  static async rateMovie(data) {
    let { rating, id } = data;
    const movie = await db.oneOrNone(fetchMovieByID, [id]);
    movie.ratingscount++;
    rating = (Math.round(rating + movie.rating / movie.ratingscount) * 10) / 10;
    console.log(rating);
    return db.none(rateMovie, [rating, movie.ratingscount, movie.id]);
  }
  /**
   * review movie with given ID
   * @memberof MovieService
   */
  static async reviewMovie(data) {
    let { review, movie_id, userId } = data;
    return db.none(reviewMovie, [review, movie_id, userId]);
  }
}
