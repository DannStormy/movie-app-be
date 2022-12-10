/* Replace with your SQL commands */
CREATE table IF NOT EXISTS movies (
    id SERIAL PRIMARY KEY,
    title TEXT NOT NULL,
    genre TEXT NOT NULL,
    year text NOT NULL,
    rating numeric(2, 1) DEFAULT NULL,
    ratingsCount int default 0,
    created_at TIMESTAMPTZ DEFAULT now(),
    updated_at TIMESTAMPTZ DEFAULT now()
);

CREATE table IF NOT EXISTS roles (
    role_id SERIAL PRIMARY KEY,
    role TEXT
);

CREATE table IF NOT EXISTS admin (
    id SERIAL PRIMARY KEY,
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    password TEXT,
    status BOOLEAN DEFAULT true,
    role_id int references roles(role_id),
    password_reset_string TEXT DEFAULT NULL,
    created_at TIMESTAMPTZ DEFAULT now(),
    updated_at TIMESTAMPTZ DEFAULT now()
);

CREATE table users (
    id SERIAL PRIMARY KEY,
    firstName TEXT NOT NULL,
    lastName TEXT NOT NULL,
    email TEXT NOT NULL,
    password TEXT NOT NULL,
    role_id INTEGER REFERENCES roles(role_id),
    emailverificationtoken TEXT DEFAULT NULL,
    email_verification_expire TEXT DEFAULT NULL,
    password_reset_string TEXT DEFAULT NULL,
    password_reset_expire TEXT DEFAULT NULL,
    created_at TIMESTAMPTZ DEFAULT now(),
    updated_at TIMESTAMPTZ DEFAULT now()
);