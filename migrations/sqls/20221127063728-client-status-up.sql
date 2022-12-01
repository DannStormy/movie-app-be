/* Replace with your SQL commands */
CREATE table IF NOT EXISTS client_account_status (
    id INTEGER REFERENCES users(id),
    status BOOLEAN DEFAULT true,
    created_at TIMESTAMPTZ DEFAULT now(),
    updated_at TIMESTAMPTZ DEFAULT now()
);