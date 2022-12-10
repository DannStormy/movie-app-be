export default {
  fetchAllMovies: `
      SELECT id, title, genre, year
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
      SELECT id, title, genre, year
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
  getUserMovieRating: `
    SELECT movies.id, title, genre, year, rating, review 
    FROM movies 
    LEFT JOIN ratings 
    ON movies.id = ratings.movie_id 
    WHERE user_id = $1
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
    SELECT 
    ROUND(AVG(rating), 2) AS average_rating,
    json_agg(review) as reviews
    FROM ratings
    WHERE movie_id = $1
  `,

  getMovieWithRating: `
    SELECT m.id, m.title, m.genre, m.year, ROUND(AVG(r.rating), 2) AS average_rating, json_agg(r.review) AS reviews 
    FROM movies m LEFT JOIN ratings r ON m.id = r.movie_id 
    WHERE movie_id = $1 and deleted = false
    GROUP BY m.id, m.title, m.genre
`,
};
