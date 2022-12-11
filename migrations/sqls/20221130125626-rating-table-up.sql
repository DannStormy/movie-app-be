/* Replace with your SQL commands */
CREATE TABLE IF NOT EXISTS ratings(
    id SERIAL PRIMARY KEY,
    movie_id INTEGER REFERENCES movies(id),
    user_id INTEGER REFERENCES users(id),
    rating numeric(3, 2) DEFAULT NULL,
    review TEXT,
    created_at TIMESTAMPTZ DEFAULT now(),
    updated_at TIMESTAMPTZ DEFAULT now()
)