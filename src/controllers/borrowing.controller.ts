import { NextFunction, Request, Response } from 'express';
import { BorrowingService } from '../services/borrowing.service';
import { CustomError } from '../middleware/errorHandler.middleware';
const borrowingService = new BorrowingService();

export const getAllBorrowings = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const borrowings = await borrowingService.indexAllBorrowings();
    res.status(200).json(borrowings);
  } catch (error) {
    next(error);
  }
};

export const getBorrowingById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const id = parseInt(req.params.borrowingId);
  try {
    const borrowing = await borrowingService.showBorrowingById(id);
    if (!borrowing) {
      throw new CustomError(404, 'Borrowing not found');
    }
    res.status(200).json(borrowing);
  } catch (error) {
    next(error);
  }
};

export const createBorrowing = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const newBorrowing = await borrowingService.create(req.body);
    res.status(201).json(newBorrowing);
  } catch (error) {
    next(new CustomError(400, 'Error creating borrowing'));
  }
};

export const returnBorrowing = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const id = parseInt(req.params.borrowingId);
  try {
    const returnedBorrowing = await borrowingService.returnBorrowing(id);
    if (!returnedBorrowing) {
      throw new CustomError(404, 'Borrowing not found');
    }
    res.status(200).json(returnedBorrowing);
  } catch (error) {
    next(error);
  }
};

export const getOverdueBorrowings = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const overdueBorrowings = await borrowingService.listOverdueBorrowings();
    res.status(200).json(overdueBorrowings);
  } catch (error) {
    next(error);
  }
};

export const exportOverdueBorrowings = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const buffer = await borrowingService.exportOverdueBorrowings();
    res.setHeader(
      'Content-Type',
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
    );
    res.setHeader(
      'Content-Disposition',
      'attachment; filename=overdue-borrowings.xlsx'
    );
    res.send(buffer);
  } catch (error) {
    next(new CustomError(500, 'Error exporting overdue borrowings'));
  }
};
