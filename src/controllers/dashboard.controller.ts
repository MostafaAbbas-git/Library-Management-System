import { Request, Response } from 'express';
import { DashboardService } from '../services/dashboard.service';

const dashboardService = new DashboardService();

export const getMostBorrowedBooks = async (req: Request, res: Response) => {
  try {
    const books = await dashboardService.mostBorrowedBooks();
    res.status(200).json(books);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
};

export const getBorrowersWithMostBorrowings = async (
  req: Request,
  res: Response
) => {
  try {
    const borrowers = await dashboardService.borrowersWithMostBorrowings();
    res.status(200).json(borrowers);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
};

export const getOverdueBooks = async (req: Request, res: Response) => {
  try {
    const books = await dashboardService.overdueBooks();
    res.status(200).json(books);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
};

export const getRecentBorrowings = async (req: Request, res: Response) => {
  try {
    const borrowings = await dashboardService.recentBorrowings();
    res.status(200).json(borrowings);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
};

export const getbooksAvailableVsCheckedOut = async (
  req: Request,
  res: Response
) => {
  try {
    const borrowings = await dashboardService.booksAvailableVsCheckedOut();
    res.status(200).json(borrowings);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
};

export const getlateReturnRateByBorrower = async (
  req: Request,
  res: Response
) => {
  try {
    const borrowings = await dashboardService.lateReturnRateByBorrower();
    res.status(200).json(borrowings);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
};
