import { Request, Response, NextFunction } from 'express';
import { UserService } from '../services/user.service';
import { CustomError } from '../middleware/errorHandler.middleware';

const userService = new UserService();

export const authenticate = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { email, password } = req.body;
  try {
    const token = await userService.authenticate(email, password);

    if (!token) {
      throw new CustomError(401, 'Authentication failed');
    }

    req.headers['Authorization'] = `Bearer ${token}`;
    res.status(200).send(token);
  } catch (error) {
    next(error);
  }
};

export const createUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = await userService.create(req.body);
    res.status(201).json(user);
  } catch (error) {
    next(error);
  }
};
