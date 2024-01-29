import { Request, Response, NextFunction } from 'express';
import { DashboardService } from '../services/dashboard.service';
import { CustomError } from '../middleware/errorHandler.middleware';

const dashboardService = new DashboardService();

export const getMostBorrowedBooks = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const books = await dashboardService.mostBorrowedBooks();
    res.status(200).json(books);
  } catch (error) {
    next(error);
  }
};

export const getBorrowersWithMostBorrowings = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const borrowers = await dashboardService.borrowersWithMostBorrowings();
    res.status(200).json(borrowers);
  } catch (error) {
    next(error);
  }
};

export const getOverdueBooks = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const books = await dashboardService.overdueBooks();
    res.status(200).json(books);
  } catch (error) {
    next(error);
  }
};

export const getRecentBorrowings = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const borrowings = await dashboardService.recentBorrowings();
    res.status(200).json(borrowings);
  } catch (error) {
    next(error);
  }
};

export const getBooksAvailableVsCheckedOut = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const data = await dashboardService.booksAvailableVsCheckedOut();
    res.status(200).json(data);
  } catch (error) {
    next(error);
  }
};

export const getLateReturnRateByBorrower = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const data = await dashboardService.lateReturnRateByBorrower();
    res.status(200).json(data);
  } catch (error) {
    next(error);
  }
};
