import { container } from 'tsyringe';
import AxiosHttpRequestProvider from './implementations/AxiosHttpRequestProvider';
import IHttpRequestProvider from './models/IHttpRequestProvider';

container.registerSingleton<IHttpRequestProvider>(
  'HttpRequestProvider',
  AxiosHttpRequestProvider
);
