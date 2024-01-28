import Client from '../startup/database';

export type Borrowing = {
  id?: number;
  book_id: number;
  borrower_id: number;
  checkout_date: Date;
  due_date: Date;
  return_date?: Date;
};

export class BorrowingModel {
  async index(): Promise<Borrowing[]> {
    try {
      const conn = await Client.connect();
      const sql = 'SELECT * FROM borrowings';
      const result = await conn.query(sql);
      conn.release();
      return result.rows;
    } catch (err) {
      throw new Error(`Could not get borrowings. Error: ${err}`);
    }
  }
  async show(id: number): Promise<Borrowing | null> {
    try {
      const conn = await Client.connect();
      const sql = 'SELECT * FROM borrowings WHERE id=($1)';
      const result = await conn.query(sql, [id]);
      conn.release();
      return result.rows.length ? result.rows[0] : null;
    } catch (err) {
      throw new Error(`Unable to find borrowing with ID ${id}: ${err}`);
    }
  }
  async update(id: number): Promise<Borrowing | null> {
    try {
      const conn = await Client.connect();
      const sql =
        'UPDATE borrowings SET return_date = CURRENT_DATE WHERE id = $1 AND return_date IS NULL RETURNING *';

      const result = await conn.query(sql, [id]);
      conn.release();

      if (result.rows.length) {
        return result.rows[0];
      } else {
        return null; // Borrowing not found or already returned
      }
    } catch (err) {
      throw new Error(`Unable to return borrowing with id: ${id}: ${err}`);
    }
  }

  async create(b: Borrowing): Promise<Borrowing> {
    try {
      const conn = await Client.connect();
      const sql =
        'INSERT INTO borrowings (book_id, borrower_id, checkout_date, due_date) VALUES($1, $2, $3, $4) RETURNING *';
      const result = await conn.query(sql, [
        b.book_id,
        b.borrower_id,
        b.checkout_date,
        b.due_date,
      ]);
      conn.release();
      return result.rows[0];
    } catch (err) {
      throw new Error(`Could not create new borrowing record. Error: ${err}`);
    }
  }

  async delete(id: number): Promise<Borrowing | null> {
    try {
      const conn = await Client.connect();
      const sql = 'DELETE FROM borrowings WHERE id=($1) RETURNING *';
      const result = await conn.query(sql, [id]);
      conn.release();
      return result.rows.length ? result.rows[0] : null;
    } catch (err) {
      throw new Error(`Could not delete borrowing ${id}. Error: ${err}`);
    }
  }

  async listOverdueBorrowings(): Promise<Borrowing[]> {
    try {
      const conn = await Client.connect();
      const sql =
        'SELECT * FROM borrowings WHERE due_date < CURRENT_DATE AND return_date IS NULL';
      const result = await conn.query(sql);
      conn.release();
      return result.rows as Borrowing[];
    } catch (err) {
      throw new Error(`Error retrieving overdue borrowings: ${err}`);
    }
  }
}
