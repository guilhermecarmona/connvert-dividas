import { container } from 'tsyringe';
import DebtsRepository from '../../modules/debts/infra/typeorm/repositories/DebtsRepository';
import IDebtsRepository from '../../modules/debts/repositories/IDebtsRepository';

import './providers';

container.registerSingleton<IDebtsRepository>(
  'DebtsRepository',
  DebtsRepository
);
