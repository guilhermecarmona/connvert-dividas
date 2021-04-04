import FakeHttpRequestProvider from '../../../shared/container/providers/HttpRequestProvider/fakes/FakeHttpRequestProvider';
import AppError from '../../../shared/errors/AppError';
import Debt from '../infra/typeorm/schemas/Debt';
import FakeDebtsRepository from '../repositories/fakes/FakeDebtsRepository';
import CreateDebtService from './CreateDebtService';

let fakeDebtsRepository: FakeDebtsRepository;
let fakeHttpRequestProvider: FakeHttpRequestProvider;
let createDebt: CreateDebtService;

describe('CreateDebt', () => {
  beforeEach(() => {
    fakeDebtsRepository = new FakeDebtsRepository();
    fakeHttpRequestProvider = new FakeHttpRequestProvider();
    createDebt = new CreateDebtService(
      fakeDebtsRepository,
      fakeHttpRequestProvider
    );
  });

  it('should be able to create a new debt', async () => {
    const debt = await createDebt.execute({
      customer_id: 1,
      when: new Date(),
      reason: 'Testing',
      amount: 10,
    });

    expect(debt).toBeInstanceOf(Debt);
    expect(debt.customer_id).toBe(1);
  });

  it('should not be able to create a new debt with an invalid customer_id', async () => {
    await expect(
      createDebt.execute({
        customer_id: 12,
        when: new Date(),
        reason: 'Testing',
        amount: 10,
      })
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to create a new debt with an amount that is less than or equal to zero', async () => {
    await expect(
      createDebt.execute({
        customer_id: 1,
        when: new Date(),
        reason: 'Testing',
        amount: -1,
      })
    ).rejects.toBeInstanceOf(AppError);
  });
});
