import { Request, Response } from 'express';
import { BorrowerService } from '../services/borrower.service';

const borrowerService = new BorrowerService();

export const getAllBorrowers = async (req: Request, res: Response) => {
  try {
    const borrowers = await borrowerService.index();
    res.status(200).json(borrowers);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};

export const getBorrowerById = async (req: Request, res: Response) => {
  const borrowerId = parseInt(req.params.borrowerId);
  try {
    const borrower = await borrowerService.show(borrowerId);
    if (borrower) {
      res.status(200).json(borrower);
    } else {
      res.status(404).json({ error: 'Borrower not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};

export const createBorrower = async (req: Request, res: Response) => {
  try {
    const newBorrower = await borrowerService.create(req.body);
    res.status(201).json(newBorrower);
  } catch (error) {
    res.status(400).json({ error: 'Error creating borrower' });
  }
};

export const updateBorrower = async (req: Request, res: Response) => {
  const borrowerId = parseInt(req.params.borrowerId);
  try {
    const updatedBorrower = await borrowerService.update(borrowerId, req.body);
    if (updatedBorrower) {
      res.status(200).json(updatedBorrower);
    } else {
      res.status(404).json({ error: 'Borrower not found' });
    }
  } catch (error) {
    res.status(400).json({ error: 'Error updating borrower' });
  }
};

export const deleteBorrower = async (req: Request, res: Response) => {
  const borrowerId = parseInt(req.params.borrowerId);
  try {
    const deletedBorrower = await borrowerService.delete(borrowerId);
    if (deletedBorrower) {
      res.status(200).json(deletedBorrower);
    } else {
      res.status(404).json({ error: 'Borrower not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};
