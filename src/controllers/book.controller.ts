import { NextFunction, Request, Response } from 'express';
import { BookService } from '../services/book.service';
import { CustomError } from '../middleware/errorHandler.middleware';
import redisClient from '../startup/redisClient';

const bookService = new BookService();

export const getAllBooks = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const cacheKey = 'allBooks';

    const cachedBooks = await redisClient.get(cacheKey);
    if (cachedBooks) {
      res.status(200).json(JSON.parse(cachedBooks));
      return;
    }

    const books = await bookService.index();
    await redisClient.set(cacheKey, JSON.stringify(books), {
      EX: 3600,
    });
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
    const bookId = parseInt(req.params.id);
    const cacheKey = `book:${bookId}`;

    const cachedBook = await redisClient.get(cacheKey);
    if (cachedBook) {
      const bookData = JSON.parse(cachedBook);
      res.status(200).json(bookData);
      return;
    }
    const book = await bookService.getBookById(bookId);
    if (!book) {
      throw new CustomError(404, 'Book not found');
    }
    await redisClient.set(cacheKey, JSON.stringify(book), {
      EX: 3600, // 1 hour
    });
    res.status(200).json(book);
  } catch (err) {
    next(err);
  }
};
export const searchBooks = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const query = req.query.query as string;
    const cacheKey = `search:${query}`;

    const cachedBooks = await redisClient.get(cacheKey);
    if (cachedBooks) {
      res.status(200).json(JSON.parse(cachedBooks));
      return;
    }

    const books = await bookService.searchBooks(query);
    await redisClient.set(cacheKey, JSON.stringify(books), {
      EX: 3600,
    });
    res.status(200).json(books);
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

    // await redisClient.del('allBooks');
    const searchKeys = await redisClient.keys('search:*');
    if (searchKeys.length > 0) {
      await redisClient.del(searchKeys);
    }
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

    await redisClient.del(`book:${bookId}`);
    await redisClient.del('allBooks');

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

    await redisClient.del(`book:${bookId}`);
    await redisClient.del('allBooks');

    res.status(200).json(deletedBook);
  } catch (err) {
    next(err);
  }
};
