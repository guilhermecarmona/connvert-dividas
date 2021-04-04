import AppError from '../../../../errors/AppError';
import IRequestDTO from '../dtos/IRequestDTO';
import IHttpRequestProvider from '../models/IHttpRequestProvider';

export default class FakeHttpRequestProvider implements IHttpRequestProvider {
  public async request({ url }: IRequestDTO): Promise<any> {
    const customer_id = url.substring(url.lastIndexOf('/') + 1);
    const data = {
      id: customer_id,
      name: 'Fake name',
    };
    if (customer_id === 'users') {
      return Promise.resolve({ data: [{ ...data, id: 1 }] });
    }
    if (Number(customer_id) >= 1 && Number(customer_id) <= 10) {
      return Promise.resolve({ data });
    }
    return Promise.reject(new AppError('invalid customer'));
  }
}
