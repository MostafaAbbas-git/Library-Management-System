import express from 'express';
import * as bookController from '../controllers/book.controller';
import {
  validateBookId,
  validateBookInputsMiddleware,
} from '../middleware/validation.middleware';
import { authMiddleware } from '../middleware/auth.middleware';

const router = express.Router();

router.get('/all', bookController.getAllBooks);
router.get('/show/:id', validateBookId, bookController.getBookById);
router.post(
  '/',
  authMiddleware,
  validateBookInputsMiddleware,
  bookController.createBook
);
router.delete('/delete/:id', validateBookId, bookController.deleteBook);

export default router;
