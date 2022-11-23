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
}