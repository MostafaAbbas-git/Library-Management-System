import express from 'express';
import * as dashboardController from '../controllers/dashboard.controller';
import { authMiddleware } from '../middleware/auth.middleware';

const router = express.Router();

router.get(
  '/most-borrowed-books',
  authMiddleware,
  dashboardController.getMostBorrowedBooks
);
router.get(
  '/borrowers-with-most-borrowings',
  authMiddleware,
  dashboardController.getBorrowersWithMostBorrowings
);
router.get(
  '/overdue-books',
  authMiddleware,
  dashboardController.getOverdueBooks
);
router.get(
  '/recent-borrowings',
  authMiddleware,
  dashboardController.getRecentBorrowings
);

export default router;
