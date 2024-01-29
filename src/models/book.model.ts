import Client from '../startup/database';

export type Book = {
  id?: number;
  title: string;
  author: string;
  isbn: string;
  available_quantity: number;
  shelf_location: string;
};

export class BookModel {
  async index(): Promise<Book[]> {
    try {
      const conn = await Client.connect();
      const sql =
        'SELECT id, title, author, isbn, available_quantity, shelf_location FROM books';
      const result = await conn.query(sql);
      conn.release();

      return result.rows;
    } catch (err) {
      throw new Error(`Unable to get books: ${err}`);
    }
  }

  async show(id: number): Promise<Book | null> {
    try {
      const conn = await Client.connect();
      const sql = 'SELECT * FROM books WHERE id=($1)';
      const result = await conn.query(sql, [id]);
      conn.release();

      return result.rows.length ? result.rows[0] : null;
    } catch (err) {
      throw new Error(`Unable to show book ${id}: ${err}`);
    }
  }

  async search(query: string): Promise<Book[]> {
    try {
      const conn = await Client.connect();

      const sql = `
      SELECT *, ts_rank_cd(to_tsvector('english', title || ' ' || author || ' ' || isbn), query) AS rank
      FROM books, to_tsquery('english', replace($1, ' ', '&')) query
      WHERE query @@ to_tsvector('english', title || ' ' || author || ' ' || isbn)
      ORDER BY rank DESC;
      `;

      const result = await conn.query(sql, [`%${query}%`]);

      conn.release();
      return result.rows;
    } catch (err) {
      throw new Error(`Error searching for books: ${err}`);
    }
  }

  async create(b: Book): Promise<Book> {
    try {
      const conn = await Client.connect();
      const sql =
        'INSERT INTO books (title, author, isbn, available_quantity, shelf_location) VALUES($1, $2, $3, $4, $5) RETURNING *';

      const result = await conn.query(sql, [
        b.title,
        b.author,
        b.isbn,
        b.available_quantity,
        b.shelf_location,
      ]);
      conn.release();

      return result.rows[0];
    } catch (err) {
      throw new Error(`Unable to create book (${b.title}): ${err}`);
    }
  }

  async update(b: Book): Promise<Book | null> {
    try {
      const conn = await Client.connect();
      const sql =
        'UPDATE books SET title=($1), author=($2), isbn=($3), available_quantity=($4), shelf_location=($5) WHERE id=($6) RETURNING *';

      const result = await conn.query(sql, [
        b.title,
        b.author,
        b.isbn,
        b.available_quantity,
        b.shelf_location,
        b.id,
      ]);
      conn.release();

      return result.rows.length ? result.rows[0] : null;
    } catch (err) {
      throw new Error(`Unable to update book with id: (${b.id}): ${err}`);
    }
  }

  async delete(id: number): Promise<Book | null> {
    try {
      const conn = await Client.connect();
      const sql = 'DELETE FROM books WHERE id=($1) RETURNING *';

      const result = await conn.query(sql, [id]);
      conn.release();

      return result.rows.length ? result.rows[0] : null;
    } catch (err) {
      throw new Error(`Unable to delete book with id: (${id}): ${err}`);
    }
  }
}
