import { injectable, inject } from 'tsyringe';
import IDebtsRepository from '../repositories/IDebtsRepository';

@injectable()
class DeleteDebtService {
  constructor(
    @inject('DebtsRepository')
    private debtsRepository: IDebtsRepository
  ) {}

  public async execute(id: string): Promise<void> {
    await this.debtsRepository.delete(id);
    return;
  }
}

export default DeleteDebtService;
