import { Buffer, Workbook } from 'exceljs';
import { Borrowing, BorrowingModel } from '../models/borrowing.model';
import { format } from 'date-fns';

export class BorrowingService {
  private borrowingModel = new BorrowingModel();

  async indexAllBorrowings(): Promise<Borrowing[] | Error> {
    try {
      const borrowings = await this.borrowingModel.index();
      return borrowings;
    } catch (error) {
      throw new Error(`Error retrieving all borrowings: ${error}`);
    }
  }

  async showBorrowingById(id: number): Promise<Borrowing | null | Error> {
    try {
      const borrowing = await this.borrowingModel.show(id);
      return borrowing;
    } catch (error) {
      throw new Error(`Error retrieving borrowing by id ${id}: ${error}`);
    }
  }

  async create(borrowing: Borrowing): Promise<Borrowing | Error> {
    try {
      return await this.borrowingModel.create(borrowing);
    } catch (error) {
      throw new Error(`Error creating borrowing: ${error}`);
    }
  }

  async returnBorrowing(id: number): Promise<Borrowing | null | Error> {
    try {
      return await this.borrowingModel.update(id);
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

    // Define columns
    worksheet.columns = [
      { header: 'Borrowing ID', key: 'id', width: 10 },
      { header: 'Book ID', key: 'book_id', width: 10 },
      { header: 'Borrower ID', key: 'borrower_id', width: 15 },
      { header: 'Checkout Date', key: 'checkout_date', width: 15 },
      { header: 'Due Date', key: 'due_date', width: 15 },
      { header: 'Return Date', key: 'return_date', width: 15 },
    ];

    // Add rows
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

    // Write to buffer
    const buffer: Buffer = await workbook.xlsx.writeBuffer();
    return buffer;
  }
}
