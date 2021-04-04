import React, { useEffect, useMemo, useState } from 'react';
import DatePicker, { registerLocale } from 'react-datepicker';
import ptBR from 'date-fns/locale/pt-BR';

import {
  FiCalendar,
  FiDollarSign,
  FiMessageCircle,
  FiSave,
  FiUsers,
  FiX,
} from 'react-icons/fi';

import { ButtonsContainer, MainContainer, InputStyled } from './styles';

interface Debt {
  id: string;
  customer_id: number;
  reason: string;
  when: Date;
  amount: number;
}

interface CustomerDto {
  id: number;
  name: string;
}

interface DialogProps {
  display: boolean;
  debt?: Debt;
  users: CustomerDto[];
  onCancelClick: () => void;
  onConfirmClick: (
    payload: Omit<Debt, 'id' | 'formattedDate'>
  ) => Promise<void>;
}

const DebtDialog: React.FC<DialogProps> = ({
  display,
  debt,
  users,
  onCancelClick,
  onConfirmClick,
}) => {
  const [customer, setCustomer] = useState<number>(debt?.customer_id || 1);
  const [reason, setReason] = useState<string>(debt?.reason || '');
  const [amount, setAmount] = useState<string>(
    debt?.amount.toString() || '0.00'
  );
  const [debtDate, setDebtDate] = useState<Date | [Date, Date] | null>(
    debt?.when || new Date()
  );

  registerLocale('ptBR', ptBR);

  useEffect(() => {
    setCustomer(debt?.customer_id || 1);
    setReason(debt?.reason || '');
    setAmount(debt?.amount.toString() || '0.00');
    if (debt && debt.when) {
      setDebtDate(new Date(debt.when) || new Date());
    }
  }, [debt]);

  function onDatePickerChange(date: Date | [Date, Date] | null) {
    if (date) {
      setDebtDate(date);
    }
  }

  const onCustomerChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setCustomer(Number(e.target.value));
  };

  const onReasonChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setReason(e.target.value);
  };

  const onAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const re = /^[0-9\.]+$/;
    if (e.target.value === '' || re.test(e.target.value)) {
      setAmount(e.target.value);
    }
  };

  const canSubmit = useMemo(() => {
    return (
      amount &&
      Number(amount) > 0 &&
      reason &&
      reason.length > 0 &&
      debtDate &&
      customer &&
      Number(customer) > 0 &&
      Number(customer) < 11
    );
  }, [amount, reason, debtDate, customer]);

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onConfirmClick({
      customer_id: customer,
      amount: Number(amount),
      when: debtDate as Date,
      reason,
    });
  };

  return (
    <>
      {display && (
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100vw',
            height: '100vh',
            background: 'rgba(0,0,0,0.8)',
          }}
        >
          <MainContainer>
            <h1>{debt ? 'Editar' : 'Nova'} dívida</h1>
            <form onSubmit={onSubmit}>
              <InputStyled>
                <FiUsers size={21} color={'#666360'} />
                <select value={customer} onChange={onCustomerChange}>
                  {users.map(user => (
                    <option key={user.id} value={user.id}>
                      {user.name}
                    </option>
                  ))}
                </select>
              </InputStyled>
              <InputStyled>
                <FiMessageCircle size={21} color={'#666360'} />
                <input
                  type='text'
                  placeholder='Motivo'
                  name='motivo'
                  value={reason}
                  onChange={onReasonChange}
                />
              </InputStyled>
              <InputStyled>
                <FiCalendar size={21} color={'#666360'} />
                <DatePicker
                  selected={debtDate as Date}
                  onChange={date => onDatePickerChange(date)}
                  onChangeRaw={e => e.preventDefault()}
                  dateFormat='dd/MM/yyyy'
                  locale='ptBR'
                />
              </InputStyled>
              <InputStyled>
                <FiDollarSign size={21} color={'#666360'} />
                <input
                  type='text'
                  placeholder='Valor'
                  name='valor'
                  value={amount}
                  onChange={onAmountChange}
                />
              </InputStyled>
              <ButtonsContainer>
                <button type='button' onClick={onCancelClick}>
                  <FiX size={21} color='#c53030' />
                  <span style={{ color: '#c53030' }}>Cancelar</span>
                </button>
                <button type='submit' disabled={!canSubmit}>
                  <FiSave size={21} color='#044661' />
                  <span style={{ color: '#044661' }}>Salvar</span>
                </button>
              </ButtonsContainer>
            </form>
          </MainContainer>
        </div>
      )}
    </>
  );
};

export default DebtDialog;
