/* eslint-disable indent */
import Client from '../startup/database';

export class DashboardService {
  async mostBorrowedBooks(): Promise<
    { title: string; author: string; borrow_count: number }[]
  > {
    try {
      const conn = await Client.connect();
      const sql =
        'SELECT title, author, COUNT(borrowings.book_id) AS borrow_count FROM books INNER JOIN borrowings ON books.id = borrowings.book_id GROUP BY books.id ORDER BY borrow_count DESC';
      const result = await conn.query(sql);
      conn.release();
      return result.rows;
    } catch (err) {
      throw new Error(`Unable to get most borrowed books: ${err}`);
    }
  }

  async borrowersWithMostBorrowings(): Promise<
    { name: string; email: string; borrowings_count: number }[]
  > {
    try {
      const conn = await Client.connect();
      const sql =
        'SELECT name, email, COUNT(borrowings.borrower_id) AS borrowings_count FROM borrowers INNER JOIN borrowings ON borrowers.id = borrowings.borrower_id GROUP BY borrowers.id ORDER BY borrowings_count DESC';
      const result = await conn.query(sql);
      conn.release();
      return result.rows;
    } catch (err) {
      throw new Error(`Unable to get borrowers with most borrowings: ${err}`);
    }
  }

  async overdueBooks(): Promise<
    { title: string; author: string; due_date: Date }[]
  > {
    try {
      const conn = await Client.connect();
      const sql =
        'SELECT title, author, borrowings.due_date FROM books INNER JOIN borrowings ON books.id = borrowings.book_id WHERE borrowings.return_date IS NULL AND borrowings.due_date < CURRENT_DATE';
      const result = await conn.query(sql);
      conn.release();
      return result.rows;
    } catch (err) {
      throw new Error(`Unable to get overdue books: ${err}`);
    }
  }

  async recentBorrowings(
    limit: number = 5
  ): Promise<
    { book_title: string; borrower_name: string; checkout_date: Date }[]
  > {
    try {
      const conn = await Client.connect();
      const sql =
        'SELECT books.title AS book_title, borrowers.name AS borrower_name, borrowings.checkout_date FROM borrowings INNER JOIN books ON borrowings.book_id = books.id INNER JOIN borrowers ON borrowings.borrower_id = borrowers.id ORDER BY borrowings.checkout_date DESC LIMIT $1';
      const result = await conn.query(sql, [limit]);
      conn.release();
      return result.rows;
    } catch (err) {
      throw new Error(`Unable to get recent borrowings: ${err}`);
    }
  }
}
