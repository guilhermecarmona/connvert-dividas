import React from 'react';
import { FiCheck, FiX } from 'react-icons/fi';

import { MainContainer } from './styles';

interface DialogProps {
  display: boolean;
  onCancelClick: () => void;
  onConfirmClick: () => void;
}

const Dialog: React.FC<DialogProps> = ({
  display,
  onCancelClick,
  onConfirmClick,
}) => {
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
            <h1>Excluir dívida</h1>
            <p>Tem certeza que deseja excluir essa dívida ?</p>
            <div>
              <button type='button' onClick={onCancelClick}>
                <FiX size={21} color='#c53030' />
                <span style={{ color: '#c53030' }}>Não</span>
              </button>
              <button type='button' onClick={onConfirmClick}>
                <FiCheck size={21} color='#044661' />
                <span style={{ color: '#044661' }}>Sim</span>
              </button>
            </div>
          </MainContainer>
        </div>
      )}
    </>
  );
};

export default Dialog;
