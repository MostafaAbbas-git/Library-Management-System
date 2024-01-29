import { Request, Response, NextFunction } from 'express';

export const validateId = (req: Request, res: Response, next: NextFunction) => {
  const id = parseInt(req.params.id);
  return id ? next() : res.status(400).send('Invalid ID');
};

export const validateBorrowerInputsMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const requiredFields = ['name', 'email', 'registered_date'];
  const missingFields = requiredFields.filter((field) => !req.body[field]);

  if (missingFields.length > 0) {
    return res.status(400).send({
      error: `Missing required borrower fields: ${missingFields.join(', ')}`,
    });
  }
  next();
};

export const validateBookInputsMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const requiredFields = ['title', 'author', 'isbn', 'shelf_location'];
  const missingFields = requiredFields.filter((field) => !req.body[field]);

  if (req.body.available_quantity == null) {
    missingFields.push('available_quantity');
  }

  if (missingFields.length > 0) {
    return res.status(400).send({
      error: `Missing required book fields: ${missingFields.join(', ')}`,
    });
  }

  next();
};

export const validateUserInputsMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const requiredFields = ['email', 'password'];
  const missingFields = requiredFields.filter((field) => !req.body[field]);

  if (missingFields.length > 0) {
    return res.status(400).send({
      error: `Missing required fields: ${missingFields.join(', ')}`,
    });
  }
  next();
};

export const validateInputsMiddleware = (requiredFields: string[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const missingFields = requiredFields.filter((field) => {
      // Special handling for fields that could be 0 or null but are required
      if (field === 'available_quantity') {
        return req.body[field] == null;
      }
      return !req.body[field];
    });

    if (missingFields.length > 0) {
      return res.status(400).send({
        error: `Missing required fields: ${missingFields.join(', ')}`,
      });
    }
    next();
  };
};
