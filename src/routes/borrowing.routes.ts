import express from 'express';
import * as borrowingController from '../controllers/borrowing.controller';
import rateLimit from 'express-rate-limit';
import { authMiddleware } from '../middleware/auth.middleware';
import { validateId } from '../middleware/validation.middleware';

const router = express.Router();

const createBorrowingLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hour
  max: 5, // Limit to 5 borrowing processes per hour per IP
  message:
    'Too many borrowings created from this IP, please try again after an hour',
});

router.get('/all', [authMiddleware], borrowingController.getAllBorrowings);
router.get(
  '/show/:id',
  [authMiddleware, validateId],
  borrowingController.getBorrowingById
);
router.get('/export/overdue', borrowingController.exportOverdueBorrowings); // excluded from auth. to be used through web broweser directly for simplicity.
router.get(
  '/getOverdueBorrowings',
  [authMiddleware],
  borrowingController.getOverdueBorrowings
);
router.post(
  '/',
  [authMiddleware, createBorrowingLimiter],
  borrowingController.createBorrowing
);
router.patch(
  '/update/return/:id',
  [authMiddleware, validateId],
  borrowingController.returnBorrowing
);

export default router;
