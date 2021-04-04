import { injectable, inject } from 'tsyringe';
import AppError from '../../../shared/errors/AppError';
import { IListDebtsByCustomerDTO } from '../dtos/IListDebtsByCustomerDTO';
import Debt from '../infra/typeorm/schemas/Debt';
import IDebtsRepository from '../repositories/IDebtsRepository';

@injectable()
class ListDebtsByCustomerService {
  constructor(
    @inject('DebtsRepository')
    private debtsRepository: IDebtsRepository
  ) {}

  public async execute({
    customer_id,
  }: IListDebtsByCustomerDTO): Promise<Debt[]> {
    if (customer_id < 1 || customer_id > 10)
      throw new AppError('invalid customer_id');

    const debts = await this.debtsRepository.filter({ customer_id });
    return debts;
  }
}

export default ListDebtsByCustomerService;
