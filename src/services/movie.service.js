import db from "../config/config";
import movie_queries from "../queries/movie.queries";
import Helper from "../utils/helpers/helpers";

const { fetchResourceByPage, calcPages } = Helper;
const {
  fetchAllMovies,
  searchMovieQuery,
  fetchMoviesCount,
  fetchMovieByID,
  rateMovie,
  addMovie,
  removeMovie,
} = movie_queries;

export default class MovieService {
  /**
   * fetch all movies
   * @memberof MovieService
   */
  static async fetchAllMovies({ page = 1, limit = 10 }) {
    console.error("Na me");
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
  static async fetchMovieByQuery({ page = 1, limit = 10, search }) {
    const { title, year, genre } = search;
    console.log("I ran");
    const [total, result] = await fetchResourceByPage({
      page,
      limit,
      getCount: fetchMoviesCount, //query to count all movies
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
    // return db.manyOrNone(searchMovieQuery, [`%${title}%`, year, `%${genre}%`]);
  }

  static async getMovies({ page, limit, search }) {
    console.log("search movies", search);
    return search
      ? MovieService.fetchMovieByQuery(page, limit, search)
      : MovieService.fetchAllMovies({ page, limit });
  }

  /**
   * add movie
   * @memberof SuperService
   */
  static async addMovie(data) {
    const { title, genre, year } = data;
    return db.none(addMovie, [title, genre, year]);
  }

  /**
   * delete movie
   * @memberof SuperService
   */
  static async removeMovie(params) {
    const { id } = params;
    return db.none(removeMovie, [id]);
  }

  /**
   * returns movie with given ID
   * @memberof SuperService
   */
  static async getMovieByID(params) {
    const { id } = params;
    return db.oneOrNone(fetchMovieByID, [id]);
  }

  /**
   * rate movie with given ID
   * @memberof SuperService
   */
  static async rateMovie(data) {
    let { rating, id } = data;
    const movie = await db.oneOrNone(fetchMovieByID, [id]);
    movie.ratingscount++;
    rating = (Math.round(rating + movie.rating / movie.ratingscount) * 10) / 10;
    console.log(rating);
    return db.none(rateMovie, [rating, movie.ratingscount, movie.id]);
  }
}
