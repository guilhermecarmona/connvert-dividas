import IRequestDTO from '../dtos/IRequestDTO';

export default interface IHttpRequestProvider {
  request<T>(data: IRequestDTO): Promise<T>;
}
