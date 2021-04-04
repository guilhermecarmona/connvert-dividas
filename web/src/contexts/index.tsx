import React from 'react';

import { LoadingProvider } from './LoadingContext';

const AppProvider: React.FC = ({ children }) => (
  <LoadingProvider>{children}</LoadingProvider>
);

export default AppProvider;
