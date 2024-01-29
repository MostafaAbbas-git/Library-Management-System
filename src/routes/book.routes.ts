import express from 'express';
import * as bookController from '../controllers/book.controller';
import {
  validateId,
  validateInputsMiddleware,
} from '../middleware/validation.middleware';
import { authMiddleware } from '../middleware/auth.middleware';

const router = express.Router();

router.get('/all', authMiddleware, bookController.getAllBooks);
router.get(
  '/show/:id',
  [authMiddleware, validateId],
  bookController.getBookById
);
router.post(
  '/',
  [
    authMiddleware,
    validateInputsMiddleware([
      'title',
      'author',
      'isbn',
      'shelf_location',
      'available_quantity',
    ]),
  ],
  bookController.createBook
);
router.patch(
  '/update/:id',
  [
    authMiddleware,
    validateInputsMiddleware([
      'title',
      'author',
      'isbn',
      'shelf_location',
      'available_quantity',
    ]),
  ],
  bookController.updateBook
);

router.delete(
  '/delete/:id',
  [authMiddleware, validateId],
  bookController.deleteBook
);

export default router;
