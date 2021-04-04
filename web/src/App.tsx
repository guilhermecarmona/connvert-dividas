import React from 'react';
import { Toaster } from 'react-hot-toast';
import { BrowserRouter } from 'react-router-dom';
import AppProvider from './contexts';
import Routes from './routes';

import 'react-datepicker/dist/react-datepicker.css';
import GlobalStyles from './styles/global';

function App() {
  return (
    <BrowserRouter>
      <AppProvider>
        <Routes />
      </AppProvider>
      <GlobalStyles />
      <Toaster position='top-right' />
    </BrowserRouter>
  );
}

export default App;
