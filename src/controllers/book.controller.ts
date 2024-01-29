import { NextFunction, Request, Response } from 'express';
import { BookService } from '../services/book.service';
import { CustomError } from '../middleware/errorHandler.middleware';

const bookService = new BookService();

export const getAllBooks = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const books = await bookService.index();
    res.status(200).json(books);
  } catch (err) {
    next(err);
  }
};
export const getBookById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const book = await bookService.getBookById(parseInt(req.params.id));
    if (!book) {
      throw new CustomError(404, 'Book not found');
    }
    res.status(200).json(book);
  } catch (err) {
    next(err);
  }
};

export const createBook = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const newBook = await bookService.create(req.body);
    res.status(201).json(newBook);
  } catch (err) {
    next(new CustomError(400, `Error creating book: ${err}`));
  }
};

export const updateBook = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const bookId = parseInt(req.params.id);
  try {
    const updatedBook = await bookService.update(bookId, req.body);
    if (!updatedBook) {
      throw new CustomError(404, 'Book not found');
    }
    res.status(200).json(updatedBook);
  } catch (err) {
    next(err);
  }
};

export const deleteBook = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const bookId = parseInt(req.params.id);
  try {
    const deletedBook = await bookService.delete(bookId);
    if (!deletedBook) {
      throw new CustomError(404, 'Book not found');
    }
    res.status(200).json(deletedBook);
  } catch (err) {
    next(err);
  }
};
