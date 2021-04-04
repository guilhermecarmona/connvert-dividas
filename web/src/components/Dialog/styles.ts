import styled from 'styled-components';

export const MainContainer = styled.div`
  padding: 16px;
  width: 320px;
  height: 180px;
  background: #fff;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  color: #000;

  h1 {
    font-size: 20px;
    border-bottom: 1px solid #888;
    margin-bottom: 16px;
  }

  div {
    margin-top: 16px;
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

      & + button {
        margin-left: 16px;
      }
    }
  }
`;
