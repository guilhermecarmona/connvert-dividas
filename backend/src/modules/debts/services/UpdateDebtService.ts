import { injectable, inject } from 'tsyringe';
import IHttpRequestProvider from '../../../shared/container/providers/HttpRequestProvider/models/IHttpRequestProvider';
import AppError from '../../../shared/errors/AppError';
import ICustomerDTO from '../dtos/ICustomerDTO';
import Debt from '../infra/typeorm/schemas/Debt';
import IDebtsRepository from '../repositories/IDebtsRepository';
import IUpdateDebtDTO from '../dtos/IUpdateDebtDTO';

@injectable()
class UpdateDebtService {
  constructor(
    @inject('DebtsRepository')
    private debtsRepository: IDebtsRepository,

    @inject('HttpRequestProvider')
    private httpRequestProvider: IHttpRequestProvider
  ) {}

  public async execute({
    id,
    amount,
    when,
    reason,
    customer_id,
  }: IUpdateDebtDTO): Promise<void> {
    if (amount <= 0) throw new AppError('Amount must be greater than 0');

    const debt = await this.debtsRepository.findById(id);
    if (!debt) throw new AppError('No debt found with provided id');

    try {
      await this.httpRequestProvider.request<{
        data: ICustomerDTO;
      }>({
        url: `https://jsonplaceholder.typicode.com/users/${customer_id}`,
        method: 'GET',
      });
    } catch {
      throw new AppError('Invalid customer_id');
    }

    debt.amount = amount;
    debt.customer_id = customer_id;
    debt.reason = reason;
    debt.when = when;

    await this.debtsRepository.update(debt);
    return;
  }
}

export default UpdateDebtService;
