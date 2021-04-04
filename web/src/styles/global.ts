import { createGlobalStyle } from 'styled-components';

export default createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    outline: 0;
  }

  body {
    background: #fff;
    color: #000;
    -webkit-font-smooting: antialiased;
  }

  body, input, button, select, option {
    font-family: 'Roboto Slab', serif;
    font-size: 16px;
  }

  button:hover {
    cursor: pointer;
  }

  h1,h2,h3,h4,h5,h6, strong {
    font-weight: 500;
  }
`;
