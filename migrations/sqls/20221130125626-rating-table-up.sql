/* Replace with your SQL commands */
CREATE TABLE IF NOT EXISTS rating(
    id SERIAL PRIMARY KEY,
    movieId INTEGER REFERENCES movies(id),
    userId INTEGER REFERENCES users(id),
    rating numeric(3, 2) DEFAULT NULL,
    created_at TIMESTAMPTZ DEFAULT now(),
    updated_at TIMESTAMPTZ DEFAULT now()
)