import { injectable, inject } from 'tsyringe';
import IHttpRequestProvider from '../../../shared/container/providers/HttpRequestProvider/models/IHttpRequestProvider';
import AppError from '../../../shared/errors/AppError';
import IDebtDTO from '../dtos/IDebtDTO';
import ICustomerDTO from '../dtos/ICustomerDTO';
import Debt from '../infra/typeorm/schemas/Debt';
import IDebtsRepository from '../repositories/IDebtsRepository';

@injectable()
class CreateDebtService {
  constructor(
    @inject('DebtsRepository')
    private debtsRepository: IDebtsRepository,

    @inject('HttpRequestProvider')
    private httpRequestProvider: IHttpRequestProvider
  ) {}

  public async execute({
    amount,
    when,
    reason,
    customer_id,
  }: IDebtDTO): Promise<Debt> {
    if (amount <= 0) throw new AppError('Amount must be greater than 0');

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

    const debt = await this.debtsRepository.create({
      amount,
      customer_id,
      reason,
      when,
    });
    return debt;
  }
}

export default CreateDebtService;
