import React from 'react';
import { MainContainer, Spinner } from './styles';

interface LoadingProps {
  display: boolean;
}

const Loading: React.FC<LoadingProps> = ({ display }) => {
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
            background: 'rgba(0,0,0,0.7)',
          }}
        >
          <MainContainer>
            <Spinner>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
            </Spinner>
          </MainContainer>
        </div>
      )}
    </>
  );
};

export default Loading;
