import { Request, Response, NextFunction } from 'express';

export const validateBookId = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const id = parseInt(req.params.id);
  if (!id) {
    return res.status(400).send('Invalid book ID');
  }
  next();
};

export const validateBorrowerInputsMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { name, email, registered_date } = req.body;
  if (!name || !email || !registered_date) {
    return res.status(400).send('Missing required borrower fields');
  }
  next();
};

export const validateBookInputsMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { title, author, isbn, available_quantity, shelf_location } = req.body;
  const missingFields = [];

  if (!title) missingFields.push('title');
  if (!author) missingFields.push('author');
  if (!isbn) missingFields.push('isbn');
  if (available_quantity == null) missingFields.push('available_quantity');
  if (!shelf_location) missingFields.push('shelf_location');

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
  if (!req.body.email || !req.body.password) {
    return res
      .status(400)
      .send({ error: 'Missing required fields email and password' });
  }
  next();
};
