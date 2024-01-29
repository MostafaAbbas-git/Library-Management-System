// src/controllers/borrowing.controller.ts
import { Request, Response } from 'express';
import { BorrowingService } from '../services/borrowing.service';

const borrowingService = new BorrowingService();

export const getAllBorrowings = async (req: Request, res: Response) => {
  try {
    const borrowings = await borrowingService.indexAllBorrowings();
    res.status(200).json(borrowings);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
};

export const getBorrowingById = async (req: Request, res: Response) => {
  const id = parseInt(req.params.borrowingId);
  try {
    const borrowing = await borrowingService.showBorrowingById(id);
    borrowing
      ? res.status(200).json(borrowing)
      : res.status(404).json({ error: 'Borrowing not found' });
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
};

export const createBorrowing = async (req: Request, res: Response) => {
  try {
    const newBorrowing = await borrowingService.create(req.body);
    res.status(201).json(newBorrowing);
  } catch (error: any) {
    res.status(400).json({ error: `${error.name}: ${error.message}` });
  }
};

export const returnBorrowing = async (req: Request, res: Response) => {
  const id = parseInt(req.params.borrowingId);
  try {
    const returnedBorrowing = await borrowingService.returnBorrowing(id);
    returnedBorrowing
      ? res.status(200).json(returnedBorrowing)
      : res.status(404).json({ error: 'Borrowing not found' });
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
};

export const getOverdueBorrowings = async (req: Request, res: Response) => {
  try {
    const overdueBorrowings = await borrowingService.listOverdueBorrowings();
    res.status(200).json(overdueBorrowings);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
};
export const exportOverdueBorrowings = async (req: Request, res: Response) => {
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
    res.status(500).json({ error: 'Error exporting overdue borrowings' });
  }
};
