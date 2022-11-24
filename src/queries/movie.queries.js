export default {
  fetchAllMovies: `
        SELECT *
        FROM movies
    `,
  fetchMoviesByPage: `
        SELECT *
        FROM movies
        LIMIT $1
        OFFSET ($2 - 1) * 5;
   `,
  fetchMovieByTitle: `
        SELECT *
        FROM movies
        WHERE title
        ILIKE $1
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
