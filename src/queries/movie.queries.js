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