import express from 'express';
import * as borrowerController from '../controllers/borrower.controller';
import { validateBorrowerInputsMiddleware } from '../middleware/validation.middleware';

const router = express.Router();

router.get('/all', borrowerController.getAllBorrowers);
router.get('/show/:borrowerId', borrowerController.getBorrowerById);
router.post(
  '/',
  validateBorrowerInputsMiddleware,
  borrowerController.createBorrower
);
router.patch(
  '/update/:borrowerId',
  validateBorrowerInputsMiddleware,
  borrowerController.updateBorrower
);
router.delete('/delete/:borrowerId', borrowerController.deleteBorrower);

export default router;
