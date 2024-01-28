// src/services/user.service.ts
import { UserModel, User } from '../models/user.model';
import jwt from 'jsonwebtoken';

const tokenSecret = String(process.env.TOKEN_SECRET);

export class UserService {
  private userModel = new UserModel();

  async authenticate(email: string, password: string): Promise<string | null> {
    const user = await this.userModel.authenticate(email, password);
    if (user) {
      const token = jwt.sign({ id: user.id, email: user.email }, tokenSecret);

      return token;
    }
    return null;
  }

  async create(userData: User): Promise<User | string> {
    try {
      return await this.userModel.create(userData);
    } catch (error) {
      throw new Error(`UserService error: ${error}`);
    }
  }
}
