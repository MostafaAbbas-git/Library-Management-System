import { Book, BookModel } from '../models/book.model';

export class BookService {
  private bookModel = new BookModel();

  async index(): Promise<Book[] | Error> {
    try {
      const books = await this.bookModel.index();
      return books;
    } catch (error) {
      console.error(error);
      throw new Error(`Error retrieving books: ${error}`);
    }
  }

  async getBookById(id: number): Promise<Book | null | Error> {
    try {
      const book = await this.bookModel.show(id);

      return book;
    } catch (error) {
      throw new Error(`Error retrieving book: ${error}`);
    }
  }

  async create(book: Book): Promise<Book | Error> {
    try {
      return await this.bookModel.create(book);
    } catch (error) {
      throw new Error(`Error creating book: ${error}`);
    }
  }

  async delete(id: number): Promise<Book | null | Error> {
    try {
      return await this.bookModel.delete(id);
    } catch (error) {
      throw new Error(`Error deleting book: ${error}`);
    }
  }
}
