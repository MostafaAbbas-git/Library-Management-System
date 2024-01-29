import { Book, BookModel } from '../models/book.model';

export class BookService {
  private bookModel = new BookModel();

  async index(): Promise<Book[]> {
    try {
      return await this.bookModel.index();
    } catch (error) {
      console.error(error);
      throw new Error(`Error retrieving books: ${error}`);
    }
  }

  async getBookById(id: number): Promise<Book | null> {
    try {
      return await this.bookModel.show(id);
    } catch (error) {
      throw new Error(`Error retrieving book: ${error}`);
    }
  }

  async create(book: Book): Promise<Book> {
    try {
      return await this.bookModel.create(book);
    } catch (error) {
      throw new Error(`Error creating book: ${error}`);
    }
  }

  async update(id: number, bookData: Book): Promise<Book | null | Error> {
    try {
      return await this.bookModel.update({ id, ...bookData });
    } catch (error) {
      throw new Error(`Error updating book with id ${id}: ${error}`);
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
