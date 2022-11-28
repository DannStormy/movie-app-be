export default {
  fetchAllMovies: `
      SELECT *
      FROM movies
      ORDER BY id ASC
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
      ILIKE $3 
      OR year = $3
      OR genre 
      ILIKE $3
      OFFSET $1 LIMIT $2
   `,
  fetchMovieByID: `
      SELECT *
      FROM movies
      WHERE id = $1
   `,
  rateMovie: `
      UPDATE movies
      SET rating = $1, ratingscount = $2
      WHERE id = $3;   
   `,
  removeMovie: `
      DELETE FROM movies
      WHERE id = $1
      `,
  addMovie: `
      INSERT INTO movies(title, genre, year)
      VALUES ($1, $2, $3)
    `,
};
