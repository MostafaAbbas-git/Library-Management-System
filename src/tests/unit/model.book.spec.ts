import { BookModel } from '../../models/book.model';
import Client from '../../startup/database';
import sinon from 'sinon';

describe('BookModel', () => {
  let bookModel: BookModel;
  let connectStub: sinon.SinonStub;

  beforeEach(() => {
    connectStub = sinon.stub(Client, 'connect');
    bookModel = new BookModel();
  });

  afterEach(() => {
    connectStub.restore();
  });

  describe('index()', () => {
    it('should return all books', async () => {
      const mockBooks = [
        { id: 1, title: 'Book 1', author: 'Author 1' },
        { id: 2, title: 'Book 2', author: 'Author 2' },
      ];
      const mockResult = { rows: mockBooks };
      console.log('mockResult:', mockResult);
      connectStub.returns(
        Promise.resolve({ query: () => Promise.resolve(mockResult) })
      );

      const books = await bookModel.index();
      console.log('books:', books);

      expect(books).toEqual(mockBooks);
      expect(connectStub).toBeCalled();
    });
  });
  describe('show(id: number)', () => {
    it('should return a specific book', async () => {
      const id = 1; // example ID
      const mockBook = { id: id, title: 'Test Book', author: 'Test Author' };
      const mockResult = { rows: [mockBook] };
      connectStub.returns(
        Promise.resolve({ query: () => Promise.resolve(mockResult) })
      );

      const book = await bookModel.show(id);

      expect(book).toEqual(mockBook);
      expect(connectStub).toBeCalled();
    });

    // ... more tests for error handling or edge cases should be implemented...
  });
});
