import IHttpRequestProvider from '../models/IHttpRequestProvider';
import axios from 'axios';
import IRequestDTO from '../dtos/IRequestDTO';

class AxiosHttpRequestProvider implements IHttpRequestProvider {
  public request<T>({ url, method, payload }: IRequestDTO): Promise<T> {
    const data = payload ? payload : '';
    return axios.request({ url, method, data });
  }
}

export default AxiosHttpRequestProvider;
