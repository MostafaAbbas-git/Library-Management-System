import express from 'express';
import * as borrowerController from '../controllers/borrower.controller';
import {
  validateId,
  validateInputsMiddleware,
} from '../middleware/validation.middleware';
import { authMiddleware } from '../middleware/auth.middleware';

const router = express.Router();

router.get('/all', [authMiddleware], borrowerController.getAllBorrowers);
router.get(
  '/show/:id',
  [authMiddleware, validateId],
  borrowerController.getBorrowerById
);
router.post(
  '/',
  [
    authMiddleware,
    validateInputsMiddleware(['name', 'email', 'registered_date']),
  ],
  borrowerController.createBorrower
);
router.patch(
  '/update/:id',
  [
    authMiddleware,
    validateInputsMiddleware(['name', 'email', 'registered_date']),
  ],
  borrowerController.updateBorrower
);
router.delete(
  '/delete/:id',
  [authMiddleware, validateId],
  borrowerController.deleteBorrower
);

export default router;
