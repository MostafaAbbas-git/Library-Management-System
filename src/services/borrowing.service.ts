import { Buffer, Workbook } from 'exceljs';
import { Borrowing, BorrowingModel } from '../models/borrowing.model';
import { format } from 'date-fns';
import { BookModel } from '../models/book.model';
import redisClient from '../startup/redisClient';

export class BorrowingService {
  private borrowingModel = new BorrowingModel();
  private bookModel = new BookModel();

  async indexAllBorrowings(): Promise<Borrowing[]> {
    try {
      const borrowings = await this.borrowingModel.index();
      return borrowings;
    } catch (error) {
      throw new Error(`Error retrieving all borrowings: ${error}`);
    }
  }

  async showBorrowingById(id: number): Promise<Borrowing | null> {
    try {
      const borrowing = await this.borrowingModel.show(id);
      return borrowing;
    } catch (error) {
      throw new Error(`Error retrieving borrowing by id ${id}: ${error}`);
    }
  }

  async create(borrowing: Borrowing): Promise<Borrowing> {
    try {
      // Check book availability
      const book = await this.bookModel.show(borrowing.book_id);

      if (book && book.available_quantity > 0) {
        await this.borrowingModel.decrementBookQuantity(borrowing.book_id);
        await redisClient.del('allBooks'); // Invalidate cache
        return await this.borrowingModel.create(borrowing);
      } else {
        throw new Error('Book is not available for borrowing');
      }
    } catch (error) {
      throw new Error(`Error creating borrowing: ${error}`);
    }
  }

  async returnBorrowing(borrowing_id: number): Promise<Borrowing | null> {
    try {
      const borrowing = await this.borrowingModel.show(borrowing_id);
      if (borrowing) {
        await this.borrowingModel.incrementBookQuantity(borrowing.book_id);
        await redisClient.del('allBooks'); // Invalidate cache
        return await this.borrowingModel.return_borrowing(borrowing_id);
      } else {
        throw new Error(`Borrowing of id :${borrowing_id} does not exist.`);
      }
    } catch (error) {
      throw new Error(`Error returning borrowing: ${error}`);
    }
  }

  async listOverdueBorrowings(): Promise<Borrowing[]> {
    try {
      return await this.borrowingModel.listOverdueBorrowings();
    } catch (error) {
      throw new Error(`Error retrieving overdue borrowings: ${error}`);
    }
  }

  async exportOverdueBorrowings(): Promise<Buffer> {
    const borrowings = await this.borrowingModel.listOverdueBorrowings();

    const workbook = new Workbook();
    const worksheet = workbook.addWorksheet('Overdue Borrowings');

    worksheet.columns = [
      { header: 'Borrowing ID', key: 'id', width: 10 },
      { header: 'Book ID', key: 'book_id', width: 10 },
      { header: 'Borrower ID', key: 'borrower_id', width: 15 },
      { header: 'Checkout Date', key: 'checkout_date', width: 15 },
      { header: 'Due Date', key: 'due_date', width: 15 },
      { header: 'Return Date', key: 'return_date', width: 15 },
    ];

    borrowings.forEach((borrowing: Borrowing) => {
      worksheet.addRow({
        id: borrowing.id,
        book_id: borrowing.book_id,
        borrower_id: borrowing.borrower_id,
        checkout_date: format(borrowing.checkout_date, 'yyyy-MM-dd'),
        due_date: format(borrowing.due_date, 'yyyy-MM-dd'),
        return_date: borrowing.return_date
          ? format(borrowing.return_date, 'yyyy-MM-dd')
          : 'Not Returned',
      });
    });

    const buffer: Buffer = await workbook.xlsx.writeBuffer();
    return buffer;
  }
}
