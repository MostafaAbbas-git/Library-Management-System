CREATE TABLE books(
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    author VARCHAR(255) NOT NULL,
    isbn VARCHAR(13) NOT NULL,
    available_quantity INTEGER NOT NULL,
    shelf_location VARCHAR(100) NOT NULL
);

-- Indexes for optimization
CREATE INDEX idx_books_title ON books(title);

CREATE INDEX idx_books_author ON books(author);

CREATE INDEX idx_books_isbn ON books(isbn);

CREATE INDEX idx_books_fulltext ON books USING gin (
    to_tsvector('english', title || ' ' || author || ' ' || isbn)
);