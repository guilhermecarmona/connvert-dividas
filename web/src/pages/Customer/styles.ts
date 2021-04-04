import styled from 'styled-components';

export const Container = styled.div``;

export const Header = styled.header`
  padding: 32px 0;
  background: #eee;
`;

export const HeaderContent = styled.div`
  max-width: 1120px;
  margin: 0 auto;
  display: flex;
  align-items: center;
  padding: 0px 24px;

  > img {
    height: 50px;
  }

  button {
    margin-left: auto;
    background: transparent;
    border: 0;

    svg {
      color: #044661;
      width: 20px;
      height: 20px;
    }
  }
`;

export const Content = styled.main`
  max-width: 1120px;
  margin: 60px auto;
  padding: 0px 24px;

  h1 {
    font-size: 22px;
    font-weight: 500;
  }

  div {
    button {
      background: transparent;
      border: 0;
      margin-right: 24px;

      svg {
        color: #044661;
        width: 20px;
        height: 20px;
      }
    }
  }
`;

export const CardsContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 24px;

  @media (max-width: 1024px) {
    display: block;
  }
`;

export const DebtCard = styled.div`
  color: #000;
  position: relative;
  background: #eee;
  padding: 24px;
  border-radius: 10px;
  margin-bottom: 24px;

  &::before {
    position: absolute;
    height: 80%;
    width: 1px;
    left: 0;
    top: 10%;
    content: '';
    background: #6fcec4;
  }
`;

export const DebtCardDetail = styled.div`
  font-size: 18px;
  font-weight: 500;

  & + div {
    margin-top: 16px;
  }

  h3 {
    font-size: 16px;
    font-weight: 400;
    color: #888;
  }

  @media (max-width: 500px) {
    font-size: 14px;

    h3 {
      font-size: 12px;
    }
  }
`;

export const ActionButtons = styled.div`
  position: absolute;
  right: 0px;
  bottom: 24px;
`;
