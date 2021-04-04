import FakeHttpRequestProvider from '../../../shared/container/providers/HttpRequestProvider/fakes/FakeHttpRequestProvider';
import AppError from '../../../shared/errors/AppError';
import Debt from '../infra/typeorm/schemas/Debt';
import FakeDebtsRepository from '../repositories/fakes/FakeDebtsRepository';
import CreateDebtService from './CreateDebtService';
import ListDebtsByCustomerService from './ListDebtsByCustomerService';
import UpdateDebtService from './UpdateDebtService';

let fakeDebtsRepository: FakeDebtsRepository;
let fakeHttpRequestProvider: FakeHttpRequestProvider;
let createDebt: CreateDebtService;
let updateDebt: UpdateDebtService;
let listDebtsByCustomer: ListDebtsByCustomerService;

describe('UpdateDebt', () => {
  beforeEach(() => {
    fakeDebtsRepository = new FakeDebtsRepository();
    fakeHttpRequestProvider = new FakeHttpRequestProvider();
    createDebt = new CreateDebtService(
      fakeDebtsRepository,
      fakeHttpRequestProvider
    );
    updateDebt = new UpdateDebtService(
      fakeDebtsRepository,
      fakeHttpRequestProvider
    );
    listDebtsByCustomer = new ListDebtsByCustomerService(fakeDebtsRepository);
  });

  it('should be able to update a debt', async () => {
    const when = new Date();
    const debt = await createDebt.execute({
      customer_id: 1,
      when,
      reason: 'Testing',
      amount: 10,
    });

    await updateDebt.execute({
      id: debt.id.toString(),
      customer_id: 2,
      when,
      reason: 'Testing update',
      amount: 151.62,
    });

    const debts = await listDebtsByCustomer.execute({ customer_id: 2 });

    expect(debts).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          customer_id: 2,
          amount: 151.62,
          reason: 'Testing update',
          id: debt.id.toString(),
          when,
        }),
      ])
    );
  });

  it('should not be able to update a debt with an invalid id', async () => {
    await expect(
      updateDebt.execute({
        id: 'invalid',
        customer_id: 1,
        when: new Date(),
        reason: 'Testing',
        amount: 10,
      })
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to update a debt with an invalid customer_id', async () => {
    const debt = await createDebt.execute({
      customer_id: 1,
      when: new Date(),
      reason: 'Testing',
      amount: 10,
    });
    await expect(
      updateDebt.execute({
        id: debt.id.toString(),
        customer_id: 12,
        when: new Date(),
        reason: 'Testing',
        amount: 10,
      })
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to update a debt with an amount that is less than or equal to zero', async () => {
    const debt = await createDebt.execute({
      customer_id: 1,
      when: new Date(),
      reason: 'Testing',
      amount: 10,
    });

    await expect(
      updateDebt.execute({
        id: debt.id.toString(),
        customer_id: 1,
        when: new Date(),
        reason: 'Testing',
        amount: -1,
      })
    ).rejects.toBeInstanceOf(AppError);
  });
});
