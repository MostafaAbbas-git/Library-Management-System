import express from 'express';
import * as borrowerController from '../controllers/borrower.controller';
import { validateInputsMiddleware } from '../middleware/validation.middleware';

const router = express.Router();

router.get('/all', borrowerController.getAllBorrowers);
router.get('/show/:borrowerId', borrowerController.getBorrowerById);
router.post(
  '/',
  validateInputsMiddleware(['name', 'email', 'registered_date']),
  borrowerController.createBorrower
);
router.patch(
  '/update/:borrowerId',
  validateInputsMiddleware(['name', 'email', 'registered_date']),
  borrowerController.updateBorrower
);
router.delete('/delete/:borrowerId', borrowerController.deleteBorrower);

export default router;
