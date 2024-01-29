import express from 'express';
import * as bookController from '../controllers/book.controller';
import {
  validateBookId,
  validateInputsMiddleware,
} from '../middleware/validation.middleware';
import { authMiddleware } from '../middleware/auth.middleware';

const router = express.Router();

router.get('/all', bookController.getAllBooks);
router.get('/show/:id', validateBookId, bookController.getBookById);
router.post(
  '/',
  authMiddleware,
  validateInputsMiddleware([
    'title',
    'author',
    'isbn',
    'shelf_location',
    'available_quantity',
  ]),
  bookController.createBook
);
router.patch(
  '/update/:bookId',
  validateInputsMiddleware([
    'title',
    'author',
    'isbn',
    'shelf_location',
    'available_quantity',
  ]),
  bookController.updateBook
);

router.delete('/delete/:id', validateBookId, bookController.deleteBook);

export default router;
