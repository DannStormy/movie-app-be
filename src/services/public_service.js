import db from "../config/config";
import public_queries from "../queries/public_queries";

const { fetchMoviesByPage, fetchAllMovies } = public_queries;

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
        let { page } = data
        return db.any(fetchMoviesByPage, [page]);
    }
}
