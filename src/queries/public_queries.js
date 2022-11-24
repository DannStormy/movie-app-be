export default {
  fetchAllMovies: `
        SELECT *
        FROM movies
    `,
  fetchMoviesByPage: `
        SELECT *
        FROM movies
        LIMIT 5
        OFFSET ($1 - 1) * 5;
   `,
  fetchMovieByTitle: `
        SELECT *
        FROM movies
        WHERE title
        ILIKE $1
   `,
  fetchMovieByRating: `
        SELECT *
        FROM movies
        WHERE rating
        BETWEEN $1
        AND $2
   `,
  fetchMovieByGenre: `
        SELECT *
        FROM movies
        WHERE genre
        ILIKE $1
   `,
  fetchMovieByYear: `
        SELECT *
        FROM movies
        WHERE year = $1
   `,
};
