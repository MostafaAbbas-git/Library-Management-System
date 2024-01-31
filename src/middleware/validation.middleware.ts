import { Request, Response, NextFunction } from 'express';

export const validateId = (req: Request, res: Response, next: NextFunction) => {
  const id = parseInt(req.params.id);
  return id ? next() : res.status(400).send('Invalid ID');
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
