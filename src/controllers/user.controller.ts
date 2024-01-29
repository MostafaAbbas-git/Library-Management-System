import { Request, Response } from 'express';
import { UserService } from '../services/user.service';

const userService = new UserService();

export const authenticate = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { email, password } = req.body;
  try {
    const token = await userService.authenticate(email, password);

    if (token) {
      req.headers['Authorization'] = `Bearer ${token}`;
      res.status(200).send(token);
    } else {
      res.status(401).json({ error: 'Authentication failed' });
    }
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
};
export const createUser = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const user = await userService.create(req.body);
    return res.status(201).json(user);
  } catch (err) {
    return res.status(500).json({ error: 'Internal server error' });
  }
};
