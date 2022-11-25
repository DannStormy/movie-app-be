export default {
  fetchAllMovies: `
        SELECT *
        FROM movies
        OFFSET $1 LIMIT $2
    `,
  fetchMoviesCount: `
        SELECT count(*)
        FROM movies
    `,
  searchMovieQuery: `
        SELECT *
        FROM movies
        WHERE title
        ILIKE $1 
        OR year = $2 
        OR genre 
        ILIKE $3
   `
};