import { Borrower, BorrowerModel } from '../models/borrower.model';
import redisClient from '../startup/redisClient'; // Assuming Redis client setup

export class BorrowerService {
  private borrowerModel = new BorrowerModel();

  async index(): Promise<Borrower[]> {
    try {
      return await this.borrowerModel.index();
    } catch (error) {
      throw new Error(`Error retrieving borrowers: ${error}`);
    }
  }
  async show(id: number): Promise<Borrower | null> {
    try {
      return await this.borrowerModel.show(id);
    } catch (error) {
      throw new Error(`Error retrieving borrower by id ${id}: ${error}`);
    }
  }

  async create(borrowerData: Borrower): Promise<Borrower | null> {
    try {
      return await this.borrowerModel.create(borrowerData);
    } catch (error) {
      throw new Error(`Error creating borrower: ${error}`);
    }
  }

  async update(id: number, borrowerData: Borrower): Promise<Borrower | null> {
    try {
      return await this.borrowerModel.update({ id, ...borrowerData });
    } catch (error) {
      throw new Error(`Error updating borrower with id ${id}: ${error}`);
    }
  }

  async delete(id: number): Promise<Borrower | null> {
    try {
      return await this.borrowerModel.delete(id);
    } catch (error) {
      throw new Error(`Error deleting borrower with id ${id}: ${error}`);
    }
  }
}
