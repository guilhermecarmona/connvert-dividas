import { getMongoRepository, MongoRepository } from 'typeorm';
import IDebtDTO from '../../../dtos/IDebtDTO';
import { IListDebtsByCustomerDTO } from '../../../dtos/IListDebtsByCustomerDTO';
import IUpdateDebtDTO from '../../../dtos/IUpdateDebtDTO';
import IDebtsRepository, {
  CustomerWithSum,
} from '../../../repositories/IDebtsRepository';
import Debt from '../schemas/Debt';

class DebtsRepository implements IDebtsRepository {
  private ormRepository: MongoRepository<Debt>;

  constructor() {
    this.ormRepository = getMongoRepository(Debt, 'mongo');
  }

  public async create({
    amount,
    customer_id,
    reason,
    when,
  }: IDebtDTO): Promise<Debt> {
    const debt = this.ormRepository.create({
      amount,
      customer_id,
      reason,
      when,
    });
    await this.ormRepository.save(debt);

    return debt;
  }

  public async findById(id: string): Promise<Debt | undefined> {
    return await this.ormRepository.findOne(id);
  }

  public async index(): Promise<CustomerWithSum[]> {
    const customersWithSum = this.ormRepository.aggregate([
      {
        $group: {
          _id: { customer_id: '$customer_id' },
          customer_id: { $first: '$customer_id' },
          amount: { $sum: '$amount' },
        },
      },
    ]);
    let retorno: CustomerWithSum[] = [];
    await new Promise((resolve, reject) => {
      customersWithSum.each((error, result) => {
        if (error) {
          reject('Internal server error');
        }
        if (result) {
          retorno.push({
            customer_id: result.customer_id,
            amount: result.amount,
          });
        } else {
          resolve('ok');
        }
      });
    });
    return retorno;
  }

  public async filter({
    customer_id,
  }: IListDebtsByCustomerDTO): Promise<Debt[]> {
    const debts = await this.ormRepository.find({ where: { customer_id } });

    return debts;
  }

  public async delete(id: string): Promise<void> {
    await this.ormRepository.delete(id);
    return;
  }

  public async update(debt: Debt): Promise<void> {
    await this.ormRepository.save(debt);

    return;
  }
}

export default DebtsRepository;
