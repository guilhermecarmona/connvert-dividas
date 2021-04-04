import { container } from 'tsyringe';
import { Request, Response } from 'express';
import CreateDebtService from '../../../services/CreateDebtService';
import ListDebtsService from '../../../services/ListDebtsService';
import ListDebtsByCustomerService from '../../../services/ListDebtsByCustomerService';
import UpdateDebtService from '../../../services/UpdateDebtService';
import DeleteDebtService from '../../../services/DeleteDebtService';

export default class DebtsController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { amount, when, reason, customer_id } = request.body;
    const createDebtService = container.resolve(CreateDebtService);
    const debt = await createDebtService.execute({
      amount,
      when,
      reason,
      customer_id,
    });
    return response.json(debt);
  }
  public async index(request: Request, response: Response): Promise<Response> {
    const listDebtsService = container.resolve(ListDebtsService);
    const customerWithSum = await listDebtsService.execute();
    return response.json(customerWithSum);
  }

  public async filter(request: Request, response: Response): Promise<Response> {
    const listDebtsByCustomer = container.resolve(ListDebtsByCustomerService);
    const { customer_id } = request.params;
    const customerDebts = await listDebtsByCustomer.execute({
      customer_id: Number(customer_id),
    });
    return response.json(customerDebts);
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const updateDebtService = container.resolve(UpdateDebtService);
    const { id } = request.params;
    const { amount, when, reason, customer_id } = request.body;
    const updatedDebt = await updateDebtService.execute({
      id,
      amount,
      when,
      reason,
      customer_id,
    });
    return response.json(updatedDebt);
  }

  public async delete(request: Request, response: Response): Promise<Response> {
    const deleteDebtService = container.resolve(DeleteDebtService);
    const { id } = request.params;
    await deleteDebtService.execute(id);
    return response.status(204).send();
  }
}
