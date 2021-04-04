import React, { useEffect, useState } from 'react';
import { FiPower, FiArrowLeft, FiEdit, FiTrash2 } from 'react-icons/fi';
import { format } from 'date-fns';
import logoImg from '../../assets/logo.png';
// import { useAuth } from '../../contexts/AuthContext';
import api from '../../services/api';
import jsonplaceholderApi from '../../services/jsonplaceholder-api';

import {
  Container,
  Header,
  HeaderContent,
  Content,
  CardsContainer,
  DebtCard,
  DebtCardDetail,
  ActionButtons,
} from './styles';
import formatValue from '../../utils/formatValue';
import { useLocation, useHistory } from 'react-router-dom';
import { useLoading } from '../../contexts/LoadingContext';
import Dialog from '../../components/Dialog';
import toast from 'react-hot-toast';
import DebtDialog from '../../components/DebtDialog';

interface CustomerDto {
  id: number;
  name: string;
}

interface Debt {
  id: string;
  customer_id: number;
  reason: string;
  when: Date;
  amount: number;
  formattedDate: string;
}

const Customer: React.FC = () => {
  const [customer, setCustomer] = useState<CustomerDto>({} as CustomerDto);
  const [customers, setCustomers] = useState<CustomerDto[]>([]);
  const [debts, setDebts] = useState<Debt[]>([]);
  const [displayDialog, setDisplayDialog] = useState<boolean>(false);
  const [displayDebtDialog, setDisplayDebtDialog] = useState<boolean>(false);
  const [selectedDebt, setSelectedDebt] = useState<Debt | undefined>(undefined);
  const { display, hide } = useLoading();
  const { search } = useLocation();
  const history = useHistory();
  const customer_id = search.split('=')[1];

  // const { signOut, user } = useAuth();

  useEffect(() => {
    async function getCustomer() {
      display();
      const { data } = await jsonplaceholderApi.get(`/${customer_id}`);
      setCustomer(data);
      hide();
    }
    getCustomer();
  }, [customer_id]);

  useEffect(() => {
    async function getCustomers() {
      display();
      const { data } = await jsonplaceholderApi.get('/');
      setCustomers(data);
      hide();
    }
    getCustomers();
  }, []);

  async function getDebts() {
    display();
    const { data } = await api.get(`/debts/${customer_id}`);
    setDebts(
      data.map((d: Debt) => {
        const debtDate = new Date(d.when);
        return {
          ...d,
          formattedDate: format(debtDate, 'dd/MM/yyyy'),
        };
      })
    );
    hide();
  }

  useEffect(() => {
    getDebts();
  }, [customer_id]);

  const formatNumber = function (value: number) {
    return formatValue(value);
  };

  const confirmRemove = (debt: Debt) => {
    setSelectedDebt(debt);
    setDisplayDialog(true);
  };

  const onCancelClick = () => {
    setSelectedDebt(undefined);
    setDisplayDialog(false);
    setDisplayDebtDialog(false);
  };

  const onEditDebt = (debt: Debt) => {
    setSelectedDebt(debt);
    setDisplayDebtDialog(true);
  };

  const onConfirmClick = async () => {
    if (!selectedDebt) return;
    try {
      display();
      await api.delete(`debts/${selectedDebt.id}`);
      const debtIdx = debts.findIndex(debt => debt.id === selectedDebt.id);
      if (debtIdx > -1) {
        const copyDebts = [...debts];
        copyDebts.splice(debtIdx, 1);
        setDebts(copyDebts);
        toast.success(`Dívida removida.`);
      }
    } catch (e) {
      console.log(e);
      toast.error(`Não foi possível remover a dívida`);
    } finally {
      hide();
      setSelectedDebt(undefined);
      setDisplayDialog(false);
    }
  };

  const onDebtConfirmClick = async (
    payload: Omit<Debt, 'id' | 'formattedDate'>
  ) => {
    if (!selectedDebt) return;
    display();
    await api.put(`/debts/${selectedDebt.id}`, payload);
    await getDebts();
    setDisplayDebtDialog(false);
    hide();
  };

  return (
    <>
      <Container>
        <Header>
          <HeaderContent>
            <img src={logoImg} alt='Guilherme Carmona' />
          </HeaderContent>
        </Header>

        <Content>
          <div
            style={{ display: 'flex', alignItems: 'center', marginBottom: 60 }}
          >
            <button type='button' onClick={history.goBack}>
              <FiArrowLeft />
            </button>
            <h1>{customer.name}</h1>
          </div>
          <CardsContainer>
            {(!debts || debts.length < 1) && <p>Nenhuma dívida encontrada.</p>}
            {debts.map(debt => (
              <DebtCard key={debt.id}>
                <DebtCardDetail>
                  <h3>Motivo</h3>
                  {debt.reason}
                </DebtCardDetail>
                <DebtCardDetail>
                  <h3>Data</h3>
                  {debt.formattedDate}
                </DebtCardDetail>
                <DebtCardDetail>
                  <h3>Valor</h3>
                  {formatNumber(debt.amount)}
                </DebtCardDetail>
                <ActionButtons>
                  <button type='button' onClick={() => onEditDebt(debt)}>
                    <FiEdit color='#044661' />
                  </button>
                  <button type='button' onClick={() => confirmRemove(debt)}>
                    <FiTrash2 color='#c53030' />
                  </button>
                </ActionButtons>
              </DebtCard>
            ))}
          </CardsContainer>
        </Content>
      </Container>
      <Dialog
        display={displayDialog}
        onCancelClick={onCancelClick}
        onConfirmClick={onConfirmClick}
      />
      <DebtDialog
        display={displayDebtDialog}
        users={customers}
        onCancelClick={onCancelClick}
        onConfirmClick={onDebtConfirmClick}
        debt={selectedDebt}
      />
    </>
  );
};

export default Customer;
