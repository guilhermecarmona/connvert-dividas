import { injectable, inject } from 'tsyringe';
import IHttpRequestProvider from '../../../shared/container/providers/HttpRequestProvider/models/IHttpRequestProvider';
import ICustomerDTO from '../dtos/ICustomerDTO';
import IDebtsRepository from '../repositories/IDebtsRepository';

interface ListDebtsServiceResponse {
  customer_id: number;
  name: string;
  amount: number;
}

@injectable()
class ListDebtsService {
  constructor(
    @inject('DebtsRepository')
    private debtsRepository: IDebtsRepository,

    @inject('HttpRequestProvider')
    private httpRequestProvider: IHttpRequestProvider
  ) {}

  public async execute(): Promise<ListDebtsServiceResponse[]> {
    try {
      const { data } = await this.httpRequestProvider.request<{
        data: ICustomerDTO[];
      }>({
        url: `https://jsonplaceholder.typicode.com/users`,
        method: 'GET',
      });
      const customersWithSum = await this.debtsRepository.index();
      let retorno: ListDebtsServiceResponse[] = [];
      for (const user of data) {
        const customerIdx = customersWithSum.findIndex(
          customer => customer.customer_id === user.id
        );
        if (customerIdx > -1) {
          retorno.push({
            customer_id: user.id,
            name: user.name,
            amount: customersWithSum[customerIdx].amount,
          });
        }
      }
      return retorno;
    } catch {
      throw new Error();
    }
  }
}

export default ListDebtsService;
