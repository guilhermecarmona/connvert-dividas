import IDebtDTO from '../dtos/IDebtDTO';
import { IListDebtsByCustomerDTO } from '../dtos/IListDebtsByCustomerDTO';
import IUpdateDebtDTO from '../dtos/IUpdateDebtDTO';
import Debt from '../infra/typeorm/schemas/Debt';

export interface CustomerWithSum {
  customer_id: number;
  amount: number;
}

export default interface IDebtsRepository {
  create(data: IDebtDTO): Promise<Debt>;
  findById(id: string): Promise<Debt | undefined>;
  index(): Promise<CustomerWithSum[]>;
  filter(data: IListDebtsByCustomerDTO): Promise<Debt[]>;
  delete(id: string): Promise<void>;
  update(debt: Debt): Promise<void>;
}
