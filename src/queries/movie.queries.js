export default {
  fetchAllMovies: `
      SELECT *
      FROM movies
      WHERE deleted = false
      ORDER BY id ASC
      OFFSET $1 LIMIT $2
    `,
  fetchMoviesCount: `
      SELECT COUNT(*)
      FROM movies
      WHERE deleted = false
    `,
  searchMovieCount: `
      SELECT count(*)
      FROM movies
      WHERE title
      ILIKE $1 
      OR year = $2
      OR genre 
      ILIKE $3 
      AND deleted = false
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
    SELECT id, title, genre, year
    FROM movies
    WHERE id = $1
    AND deleted = false
   `,
  rateMovie: `
      INSERT INTO ratings(movie_id, user_id, rating, review)
      VALUES ($1, $2, $3, $4)
   `,
  removeMovie: `
      UPDATE movies
      SET deleted = true,
      updated_at = NOW()
      WHERE id = $1
      `,
  addMovie: `
      INSERT INTO movies(title, genre, year)
      VALUES ($1, $2, $3)
    `,
  editTitle: `
    UPDATE movies
    SET title = $1,
    updated_at = NOW()
    WHERE id = $2
  `,
  getRating: `
    SELECT * FROM ratings
    WHERE movie_id = $1 
    AND user_id = $2
  `,
  editRating: `
    UPDATE ratings 
    SET rating = COALESCE (NULLIF($1, 0), rating),
    review = COALESCE (NULLIF($2, ''), review),
    updated_at = NOW()
    WHERE movie_id = $3 AND user_id = $4
    RETURNING *;
  `,
  getMovieRatings: `
    SELECT rating, review
    FROM ratings
    WHERE movie_id = $1
  `,
};
