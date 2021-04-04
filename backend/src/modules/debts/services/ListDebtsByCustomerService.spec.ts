import FakeHttpRequestProvider from '../../../shared/container/providers/HttpRequestProvider/fakes/FakeHttpRequestProvider';
import AppError from '../../../shared/errors/AppError';
import Debt from '../infra/typeorm/schemas/Debt';
import FakeDebtsRepository from '../repositories/fakes/FakeDebtsRepository';
import CreateDebtService from './CreateDebtService';
import ListDebtsByCustomerService from './ListDebtsByCustomerService';

let fakeDebtsRepository: FakeDebtsRepository;
let fakeHttpRequestProvider: FakeHttpRequestProvider;
let createDebt: CreateDebtService;
let listDebtsByCustomer: ListDebtsByCustomerService;

describe('ListDebtsByCustomer', () => {
  beforeEach(() => {
    fakeDebtsRepository = new FakeDebtsRepository();
    fakeHttpRequestProvider = new FakeHttpRequestProvider();
    createDebt = new CreateDebtService(
      fakeDebtsRepository,
      fakeHttpRequestProvider
    );
    listDebtsByCustomer = new ListDebtsByCustomerService(fakeDebtsRepository);
  });

  it("should be able to list a customer's debts", async () => {
    await createDebt.execute({
      customer_id: 1,
      when: new Date(),
      reason: 'Testing',
      amount: 10,
    });
    await createDebt.execute({
      customer_id: 1,
      when: new Date(),
      reason: 'Testing',
      amount: 9.5,
    });

    const debts = await listDebtsByCustomer.execute({ customer_id: 1 });

    expect(debts).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          customer_id: 1,
          amount: 10,
        }),
        expect.objectContaining({
          customer_id: 1,
          amount: 9.5,
        }),
      ])
    );
  });

  it('should not be able to list the debts of an invalid customer_id', async () => {
    await expect(
      listDebtsByCustomer.execute({ customer_id: 12 })
    ).rejects.toBeInstanceOf(AppError);
  });
});
