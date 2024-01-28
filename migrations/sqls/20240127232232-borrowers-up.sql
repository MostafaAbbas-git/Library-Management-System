CREATE TABLE borrowers (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    registered_date TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- Index for optimization
CREATE INDEX idx_borrowers_email ON borrowers(email);