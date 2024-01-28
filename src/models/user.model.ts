import Client from '../startup/database';
import { compareHash, createHash } from '../utilities/bcrypt';

export type User = {
  id?: number;
  email: string;
  password: string;
};

export class UserModel {
  async authenticate(email: string, password: string): Promise<User | null> {
    try {
      const conn = await Client.connect();
      const sql = 'SELECT * FROM users WHERE email=($1)';
      const result = await conn.query(sql, [email]);

      if (result.rows.length) {
        const user = result.rows[0] as User;
        const hashResult: Boolean = compareHash(password, user.password);

        conn.release();

        if (hashResult) {
          return user;
        }
      }

      return null;
    } catch (err) {
      throw new Error(`Authentication failed: ${err}`);
    }
  }

  async create(u: User): Promise<User | string> {
    try {
      // @ts-ignore
      const conn = await Client.connect();
      const sql =
        'INSERT INTO users (email, password) VALUES($1, $2) RETURNING *';

      const hash = createHash(u.password);

      const result = await conn.query(sql, [u.email, hash]);
      const user = result.rows[0];

      conn.release();

      return user;
    } catch (err) {
      return `unable to create user (${u.email}): ${err}`;
    }
  }
}
