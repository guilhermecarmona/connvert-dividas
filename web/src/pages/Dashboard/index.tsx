import React, { useEffect, useState } from 'react';
import logoImg from '../../assets/logo.png';
import { FiPlusCircle, FiPower } from 'react-icons/fi';
// import { useAuth } from '../../contexts/AuthContext';
import api from '../../services/api';

import {
  Container,
  Header,
  HeaderContent,
  Content,
  ContentTitle,
  CardsContainer,
  UserName,
  Amount,
} from './styles';
import formatValue from '../../utils/formatValue';
import { Link } from 'react-router-dom';
import { useLoading } from '../../contexts/LoadingContext';
import DebtDialog from '../../components/DebtDialog';
import jsonplaceholderApi from '../../services/jsonplaceholder-api';

interface UserWithDebts {
  name: string;
  customer_id: number;
  amount: number;
}

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
}

const Dashboard: React.FC = () => {
  const [usersWithDebts, setUsersWithDebts] = useState<UserWithDebts[]>([]);
  const [customers, setCustomers] = useState<CustomerDto[]>([]);
  const [displayDialog, setDisplayDialog] = useState<boolean>(false);
  const { display, hide } = useLoading();
  // const { signOut, user } = useAuth();

  async function getUsersWithDebts() {
    display();
    const { data } = await api.get('/debts');
    setUsersWithDebts(data);
    hide();
  }

  useEffect(() => {
    getUsersWithDebts();
  }, []);

  useEffect(() => {
    async function getCustomers() {
      display();
      const { data } = await jsonplaceholderApi.get('/');
      setCustomers(data);
      hide();
    }
    getCustomers();
  }, []);

  const formatNumber = function (value: number) {
    return formatValue(value);
  };

  const openDebtDialog = () => {
    setDisplayDialog(true);
  };

  const onDebtConfirmClick = async (
    payload: Omit<Debt, 'id' | 'formattedDate'>
  ) => {
    display();
    await api.post('/debts', payload);
    await getUsersWithDebts();
    setDisplayDialog(false);
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
          <ContentTitle>
            <h1>Usuários com dívidas</h1>
            <button type='button' onClick={openDebtDialog}>
              <FiPlusCircle size={20} color='#044661' />
              <span>Adicionar</span>
            </button>
          </ContentTitle>
          <CardsContainer>
            {(!usersWithDebts || usersWithDebts.length < 1) && (
              <p>Nenhum cliente com dívidas encontrado.</p>
            )}
            {usersWithDebts.map(user => (
              <Link
                key={user.customer_id}
                to={{
                  pathname: 'Customer',
                  search: `customer_id=${user?.customer_id?.toString()}`,
                }}
              >
                <UserName>
                  <h3>Nome</h3>
                  {user.name}
                </UserName>
                <Amount>
                  <h3>Total</h3>
                  {formatNumber(user.amount)}
                </Amount>
              </Link>
            ))}
          </CardsContainer>
        </Content>
      </Container>
      <DebtDialog
        display={displayDialog}
        users={customers}
        onCancelClick={() => setDisplayDialog(false)}
        onConfirmClick={onDebtConfirmClick}
      />
    </>
  );
};

export default Dashboard;
