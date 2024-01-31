import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

interface UserMiddlewareInterface extends Object {
  id?: number;
  email?: string;
}

declare global {
  namespace Express {
    interface Request {
      user: UserMiddlewareInterface;
    }
  }
}
export async function authMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<unknown> {
  const tokenSecret = String(process.env.TOKEN_SECRET);
  const authorizationHeader = String(req.headers.authorization);
  const token = authorizationHeader.split(' ')[1];

  if (!token) return res.status(401).send('Access denied. No token provided.');

  try {
    const decoded = jwt.verify(String(token), String(tokenSecret));
    req.user = decoded as UserMiddlewareInterface;
    next();
  } catch (error: any) {
    if (error instanceof jwt.TokenExpiredError) {
      return res.status(401).send('Token expired.');
    }
    res.status(400).send({
      error: `${error.name}: ${error.message}`,
    });
  }
}
