import FakeHttpRequestProvider from '../../../shared/container/providers/HttpRequestProvider/fakes/FakeHttpRequestProvider';
import FakeDebtsRepository from '../repositories/fakes/FakeDebtsRepository';
import CreateDebtService from './CreateDebtService';
import DeleteDebtService from './DeleteDebtService';
import ListDebtsByCustomerService from './ListDebtsByCustomerService';

let fakeDebtsRepository: FakeDebtsRepository;
let fakeHttpRequestProvider: FakeHttpRequestProvider;
let createDebt: CreateDebtService;
let deleteDebt: DeleteDebtService;
let listDebtsByCustomer: ListDebtsByCustomerService;

describe('DeleteDebt', () => {
  beforeEach(() => {
    fakeDebtsRepository = new FakeDebtsRepository();
    fakeHttpRequestProvider = new FakeHttpRequestProvider();
    createDebt = new CreateDebtService(
      fakeDebtsRepository,
      fakeHttpRequestProvider
    );
    deleteDebt = new DeleteDebtService(fakeDebtsRepository);
    listDebtsByCustomer = new ListDebtsByCustomerService(fakeDebtsRepository);
  });

  it('should be able to update a debt', async () => {
    const debt = await createDebt.execute({
      customer_id: 1,
      when: new Date(),
      reason: 'Testing',
      amount: 10,
    });

    const debt2 = await createDebt.execute({
      customer_id: 1,
      when: new Date(),
      reason: 'Testing',
      amount: 11,
    });

    await deleteDebt.execute(debt2.id.toString());
    const debts = await listDebtsByCustomer.execute({ customer_id: 1 });
    expect(debts).toHaveLength(1);
    expect(debts).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          customer_id: debt.customer_id,
          amount: debt.amount,
        }),
      ])
    );
  });
});
