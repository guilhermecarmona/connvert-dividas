import styled from 'styled-components';

export const MainContainer = styled.div`
  padding: 16px;
  width: 320px;
  background: #f5f5f5;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  color: #3e3b47;

  h1 {
    font-size: 20px;
    border-bottom: 1px solid #aaa;
    margin-bottom: 16px;
  }
`;

export const ButtonsContainer = styled.div`
  margin-top: 32px;
  display: flex;
  align-items: center;
  justify-content: flex-end;

  button {
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: transparent;
    border: 0;
    cursor: pointer;
    transition: opacity 0.2s;
    outline: none;

    &:hover {
      opacity: 0.8;
    }

    &:disabled {
      cursor: not-allowed;
    }

    & + button {
      margin-left: 16px;
    }
  }
`;

export const InputStyled = styled.div`
  color: #232129;
  background: #fff;
  border-radius: 10px;
  border: 2px solid #fff;
  padding: 16px;
  display: flex;
  align-items: center;
  height: 50px;
  width: 100%;

  & + div {
    margin-top: 8px;
  }

  input {
    background: transparent;
    border: 0;
    flex: 1;
  }

  select {
    background: transparent;
    border: 0;
    flex: 1;
  }

  svg {
    margin-right: 16px;
  }
`;
