export default {
  fetchAllMovies: `
      SELECT *
      FROM movies
      ORDER BY id ASC
      OFFSET $1 LIMIT $2
    `,
  fetchMoviesCount: `
      SELECT COUNT(*)
      FROM movies
    `,
  searchMovieCount: `
      SELECT count(*)
      FROM movies
      WHERE title
      ILIKE $1 
      OR year = $2
      OR genre 
      ILIKE $3
   `,
  searchMovieQuery: `
      SELECT *
      FROM movies
      WHERE title
      ILIKE $3 
      OR year = $4
      OR genre 
      ILIKE $5
      OFFSET $1 LIMIT $2
   `,
  fetchMovieByID: `
      SELECT *
      FROM movies
      WHERE id = $1
   `,
  rateMovie: `
      UPDATE movies
      SET rating = $1, ratingscount = $2, updated_at = NOW()
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
  reviewMovie: `
      INSERT INTO reviews(review, movie_id, user_id)
      VALUES ($1, $2, $3)
  `,
  editTitle: `
    UPDATE movies
    SET title = $1,
    updated_at = NOW()
    WHERE id = $2
  `,
  editRating: `
    UPDATE movies
    SET rating = $1,
    updated_at = NOW()
    WHERE id = $2
  `,
  editReview: `
    UPDATE reviews
    SET review = $1,
    updated_at = NOW()
    WHERE id = $2
  `,
};
