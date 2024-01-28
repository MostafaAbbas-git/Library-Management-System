CREATE TABLE borrowings (
    id SERIAL PRIMARY KEY,
    book_id INTEGER NOT NULL REFERENCES books(id),
    borrower_id INTEGER NOT NULL REFERENCES borrowers(id),
    checkout_date TIMESTAMP NOT NULL,
    due_date TIMESTAMP NOT NULL,
    return_date TIMESTAMP
);

-- Index for optimization
CREATE INDEX idx_borrowings_book_id ON borrowings(book_id);

CREATE INDEX idx_borrowings_borrower_id ON borrowings(borrower_id);