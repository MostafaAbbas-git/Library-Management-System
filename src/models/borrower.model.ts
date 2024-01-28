import Client from '../startup/database';

export type Borrower = {
  id?: number;
  name: string;
  email: string;
  registered_date: Date;
};

export class BorrowerModel {
  async index(): Promise<Borrower[]> {
    try {
      const conn = await Client.connect();
      const sql = 'SELECT * FROM borrowers';
      const result = await conn.query(sql);
      conn.release();

      return result.rows;
    } catch (err) {
      throw new Error(`Unable to get borrowers: ${err}`);
    }
  }

  async show(id: number): Promise<Borrower | null> {
    try {
      const sql = 'SELECT * FROM borrowers WHERE id=($1)';
      const conn = await Client.connect();
      const result = await conn.query(sql, [id]);

      conn.release();

      return result.rows.length ? result.rows[0] : null;
    } catch (err) {
      throw new Error(`Unable to show borrower ${id}: ${err}`);
    }
  }
  async create(b: Borrower): Promise<Borrower> {
    try {
      const conn = await Client.connect();
      const sql =
        'INSERT INTO borrowers (name, email, registered_date) VALUES($1, $2, $3) RETURNING *';

      const result = await conn.query(sql, [
        b.name,
        b.email,
        b.registered_date,
      ]);
      conn.release();

      return result.rows[0];
    } catch (err) {
      throw new Error(`Unable to create borrower (${b.email}): ${err}`);
    }
  }

  async update(b: Borrower): Promise<Borrower | null> {
    try {
      const conn = await Client.connect();
      const sql =
        'UPDATE borrowers SET name=($1), email=($2), registered_date=($3) WHERE id=($4) RETURNING *';
      const result = await conn.query(sql, [
        b.name,
        b.email,
        b.registered_date,
        b.id,
      ]);
      conn.release();

      return result.rows.length ? result.rows[0] : null;
    } catch (err) {
      throw new Error(`Unable to update borrower with id: (${b.id}): ${err}`);
    }
  }

  async delete(id: number): Promise<Borrower | null> {
    try {
      const conn = await Client.connect();
      const sql = 'DELETE FROM borrowers WHERE id=($1) RETURNING *';
      const result = await conn.query(sql, [id]);
      conn.release();

      return result.rows.length ? result.rows[0] : null;
    } catch (err) {
      throw new Error(`Unable to delete borrower with id: (${id}): ${err}`);
    }
  }
}
