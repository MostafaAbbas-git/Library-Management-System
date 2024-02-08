CREATE TABLE books(
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    author VARCHAR(255) NOT NULL,
    isbn VARCHAR(13) NOT NULL,
    available_quantity INTEGER NOT NULL,
    shelf_location VARCHAR(100) NOT NULL
);

-- Replace individual title and author indexes with a GIN index for full-text search
DROP INDEX IF EXISTS idx_books_title;

DROP INDEX IF EXISTS idx_books_author;

CREATE INDEX idx_books_isbn ON books(isbn);

-- Adding a GIN index for full-text search on title and author
CREATE INDEX idx_books_fulltext ON books USING gin (
    to_tsvector('english', title || ' ' || author)
);