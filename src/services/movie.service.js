import db from "../config/config";
import movie_queries from "../queries/movie.queries";
import Helper from "../utils/helpers/helpers";

const { fetchResourceByPage, calcPages, getRating } = Helper;

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
   * delete movie
   * @memberof MovieService
   */
  static async removeMovie(params) {
    const { movieId } = params;
    return db.none(movie_queries.removeMovie, [movieId]);
  }

  /**
   * returns movie with given ID
   * @memberof MovieService
   */
  static async getMovieByID(params) {
    const { movieId } = params;
    const movie = await db.oneOrNone(movie_queries.fetchMovieByID, [movieId]);
    const rating = await getRating(movie_queries.getMovieRatings, movieId);
    return { movie, rating };
  }

  /**
   * rate movie with given ID
   * @memberof MovieService
   */
  static async rateMovie(body) {
    const { movieId, userId, rating } = body;
    return db.none(movie_queries.rateMovie, [movieId, userId, rating]);
  }

  /**
   * review movie with given ID
   * @memberof MovieService
   */
  static async reviewMovie(data) {
    const { review, movie_id, userId } = data;
    return db.none(movie_queries.reviewMovie, [review, movie_id, userId]);
  }

  /**
   * edit title with given ID
   * @memberof MovieService
   */
  static async editTitle(body, params) {
    const { title } = body;
    const { id } = params;
    return db.none(movie_queries.editTitle, [title, id]);
  }

  /**
   * edit rating with given ID
   * @memberof MovieService
   */
  static async editRating(body, params) {
    const { rating } = body;
    const { id } = params;
    return db.none(movie_queries.editRating, [rating, id]);
  }

  /**
   * edit review with given ID
   * @memberof MovieService
   */
  static async editReview(body, params) {
    const { review } = body;
    const { id } = params;
    return db.none(movie_queries.editReview, [review, id]);
  }

  /**
   * get all reviews
   * @memberof MovieService
   */
  static async getAllReviews() {
    return db.manyOrNone(movie_queries.getAllReviews);
  }

  /**
   * get reviews by ID
   * @memberof MovieService
   */
  static async getReviewsById(params) {
    const { movieId } = params;
    return db.manyOrNone(movie_queries.getReviewsById, [movieId]);
  }
}
