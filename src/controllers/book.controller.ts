import { Request, Response } from 'express';
import { BookService } from '../services/book.service';

const bookService = new BookService();

export const getAllBooks = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const books = await bookService.index();
    res.status(200).json(books);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to retrieve books' });
  }
};

export const getBookById = async (
  req: Request,
  res: Response
): Promise<void> => {
  const bookId = parseInt(req.params.id);
  try {
    const book = await bookService.getBookById(bookId);
    book
      ? res.status(200).json(book)
      : res.status(404).json({ error: 'Book not found' });
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
};

export const createBook = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const newBook = await bookService.create(req.body);
    res.status(201).json(newBook);
  } catch (err) {
    res.status(400).json({ error: `Error creating book: ${err}` });
  }
};

export const updateBook = async (req: Request, res: Response) => {
  const bookId = parseInt(req.params.bookId);
  try {
    const updatedBook = await bookService.update(bookId, req.body);
    if (updatedBook) {
      res.status(200).json(updatedBook);
    } else {
      res.status(404).json({ error: 'Book not found' });
    }
  } catch (error) {
    res.status(400).json({ error: 'Error updating book' });
  }
};

export const deleteBook = async (
  req: Request,
  res: Response
): Promise<void> => {
  const bookId = parseInt(req.params.id);
  try {
    const deletedBook = await bookService.delete(bookId);
    deletedBook
      ? res.status(200).json(deletedBook)
      : res.status(404).json({ error: 'Book not found' });
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
};
