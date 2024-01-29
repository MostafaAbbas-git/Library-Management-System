import { NextFunction, Request, Response } from 'express';
import { BorrowerService } from '../services/borrower.service';
import { CustomError } from '../middleware/errorHandler.middleware';

const borrowerService = new BorrowerService();

export const getAllBorrowers = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const borrowers = await borrowerService.index();
    res.status(200).json(borrowers);
  } catch (error) {
    next(error);
  }
};

export const getBorrowerById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const borrowerId = parseInt(req.params.id);
  try {
    const borrower = await borrowerService.show(borrowerId);
    if (!borrower) {
      throw new CustomError(404, 'Borrower not found');
    }
    res.status(200).json(borrower);
  } catch (error) {
    next(error);
  }
};

export const createBorrower = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const newBorrower = await borrowerService.create(req.body);
    res.status(201).json(newBorrower);
  } catch (error) {
    next(new CustomError(400, 'Error creating borrower'));
  }
};

export const updateBorrower = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const borrowerId = parseInt(req.params.id);
  try {
    const updatedBorrower = await borrowerService.update(borrowerId, req.body);
    if (!updatedBorrower) {
      throw new CustomError(404, 'Borrower not found');
    }
    res.status(200).json(updatedBorrower);
  } catch (error) {
    next(error);
  }
};

export const deleteBorrower = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const borrowerId = parseInt(req.params.id);
  try {
    const deletedBorrower = await borrowerService.delete(borrowerId);
    if (!deletedBorrower) {
      throw new CustomError(404, 'Borrower not found');
    }
    res.status(200).json(deletedBorrower);
  } catch (error) {
    next(error);
  }
};
