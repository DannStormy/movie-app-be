import db from "../config/db/config";
import movie_queries from "../queries/movie.queries";
import Helper from "../utils/helpers/helpers";

const { fetchResourceByPage, calcPages } = Helper;

export default class MovieService {
  /**
   * fetch all movies
   * @memberof MovieService
   */
  static async fetchAllMovies({ page = 1, limit = 10 }) {
    const [total, result] = await fetchResourceByPage({
      page,
      limit,
      getCount: movie_queries.fetchMoviesCount, //query to count all movies
      getResources: movie_queries.fetchAllMovies, //query to get all the movies
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
      getCount: movie_queries.searchMovieCount, //query to count all movies
      getResources: movie_queries.searchMovieQuery, //query to get all the movies
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
    return db.none(movie_queries.addMovie, [title, genre, year]);
  }

  /**
   * soft delete movie
   * @memberof MovieService
   */
  static async removeMovie(movieId) {
    return db.none(movie_queries.removeMovie, [movieId]);
  }

  /**
   * returns movie with given ID
   * @memberof MovieService
   */
  static async getMovieByID(movieId) {
    return db.oneOrNone(movie_queries.fetchMovieByID, [movieId]);
  }

  /**
   * returns average rating of movie and reviews with given ID
   * @memberof MovieService
   */
  static async getMovieRatings(movieId) {
    return db.any(movie_queries.getMovieRatings, [movieId]);
  }

  /**
   * returns one movie/avg rating & reviews
   * @memberof MovieService
   */
  static async getRatingsAndReviews(movieId) {
    return Promise.all([
      MovieService.getMovieByID(movieId),
      MovieService.getMovieRatings(movieId),
    ]);
  }

  /**
   * get user movie ratings and reviews
   * @memberof MovieService
   */
  static async getMovieRating(userId) {
    return db.manyOrNone(movie_queries.getUserMovieRating, [userId]);
  }
  /**
   * rate movie with given ID
   * @memberof MovieService
   */
  static async rateMovie(movieId, userId, body) {
    const { rating, review } = body;
    return db.none(movie_queries.rateMovie, [movieId, userId, rating, review]);
  }

  /**
   * edit title with given ID
   * @memberof MovieService
   */
  static async editTitle(title, movieId) {
    return db.none(movie_queries.editTitle, [title, movieId]);
  }

  /**
   * edit rating with given ID
   * @memberof MovieService
   */
  static async editRating(rating, review, movieId, userId) {
    return db.any(movie_queries.editRating, [rating, review, movieId, userId]);
  }
}
