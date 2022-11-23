/* Replace with your SQL commands */
CREATE table IF NOT EXISTS movies (
    id SERIAL PRIMARY KEY,
    title TEXT NOT NULL,
    genre TEXT NOT NULL,
    year integer NOT NULL,
    rating integer DEFAULT NULL,
    created_at TIMESTAMPTZ DEFAULT now(),
    updated_at TIMESTAMPTZ DEFAULT now()
);

CREATE table IF NOT EXISTS reviews (
    id SERIAL PRIMARY KEY,
    review TEXT,
    movie_id INTEGER REFERENCES movies(id),
    user_id INTEGER REFERENCES users(id),
    created_at TIMESTAMPTZ DEFAULT now(),
    updated_at TIMESTAMPTZ DEFAULT now()
);