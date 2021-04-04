import FakeHttpRequestProvider from '../../../shared/container/providers/HttpRequestProvider/fakes/FakeHttpRequestProvider';
import FakeDebtsRepository from '../repositories/fakes/FakeDebtsRepository';
import CreateDebtService from './CreateDebtService';
import ListDebtsService from './ListDebtsService';

let fakeDebtsRepository: FakeDebtsRepository;
let createDebt: CreateDebtService;
let fakeHttpRequestProvider: FakeHttpRequestProvider;
let listDebts: ListDebtsService;

describe('ListDebts', () => {
  beforeEach(() => {
    fakeDebtsRepository = new FakeDebtsRepository();
    fakeHttpRequestProvider = new FakeHttpRequestProvider();
    createDebt = new CreateDebtService(
      fakeDebtsRepository,
      fakeHttpRequestProvider
    );
    listDebts = new ListDebtsService(
      fakeDebtsRepository,
      fakeHttpRequestProvider
    );
  });

  it('should be able to list debts with customer_id and amount', async () => {
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
      amount: 11.52,
    });

    const customersWithSum = await listDebts.execute();

    expect(customersWithSum).toEqual(
      expect.arrayContaining([
        { customer_id: 1, amount: 21.52, name: 'Fake name' },
      ])
    );
  });
});
