import { ObjectID } from 'mongodb';
import IDebtDTO from '../../dtos/IDebtDTO';
import { IListDebtsByCustomerDTO } from '../../dtos/IListDebtsByCustomerDTO';
import IUpdateDebtDTO from '../../dtos/IUpdateDebtDTO';
import Debt from '../../infra/typeorm/schemas/Debt';
import IDebtsRepository from '../IDebtsRepository';

interface CustomerWithSum {
  customer_id: number;
  amount: number;
}

class FakeDebtsRepository implements IDebtsRepository {
  private debts: Debt[] = [];

  public async create({
    customer_id,
    amount,
    when,
    reason,
  }: IDebtDTO): Promise<Debt> {
    const debt = new Debt();

    Object.assign(debt, {
      id: new ObjectID(),
      customer_id,
      amount,
      when,
      reason,
    });
    this.debts.push(debt);
    return debt;
  }

  public async findById(id: string): Promise<Debt | undefined> {
    return this.debts.find(debt => debt.id.toString() === id);
  }

  public async index(): Promise<CustomerWithSum[]> {
    let customersWithSum: { [key: number]: number } = {};
    this.debts.map(debt => {
      if (customersWithSum.hasOwnProperty(debt.customer_id)) {
        customersWithSum[debt.customer_id] =
          customersWithSum[debt.customer_id] + debt.amount;
      } else {
        customersWithSum[debt.customer_id] = debt.amount;
      }
    });
    return Object.keys(customersWithSum).map(cws => {
      return {
        customer_id: Number(cws),
        amount: customersWithSum[Number(cws)],
      };
    });
  }

  public async filter({
    customer_id,
  }: IListDebtsByCustomerDTO): Promise<Debt[]> {
    return this.debts.filter(debt => debt.customer_id === customer_id);
  }

  public async delete(id: string): Promise<void> {
    const debtIdx = this.debts.findIndex(debt => debt.id.toString() === id);
    if (debtIdx > -1) {
      this.debts.splice(debtIdx, 1);
    }
    return;
  }

  public async update(debt: Debt): Promise<void> {
    const debtIdx = this.debts.findIndex(debt => debt.id === debt.id);
    const debtInstance = new Debt();
    if (debtIdx > -1) {
      Object.assign(debtInstance, { ...debt, id: debt.id.toString() });
      this.debts.splice(debtIdx, 1, debtInstance);
    }
    return;
  }
}

export default FakeDebtsRepository;
