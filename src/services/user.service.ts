import { UserModel, User } from '../models/user.model';
import jwt from 'jsonwebtoken';

const tokenSecret = String(process.env.TOKEN_SECRET);
const expiresIn = '1h'; // Token expires in one hour

export class UserService {
  private userModel = new UserModel();

  async authenticate(email: string, password: string): Promise<string | null> {
    const user = await this.userModel.authenticate(email, password);

    return user
      ? jwt.sign({ id: user.id, email: user.email }, tokenSecret, { expiresIn })
      : null;
  }

  async create(userData: User): Promise<User> {
    try {
      return await this.userModel.create(userData);
    } catch (error) {
      throw new Error(`UserService error: ${error}`);
    }
  }
}
