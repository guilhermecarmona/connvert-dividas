import React from 'react';

import { AuthProvider } from './AuthContext';
import { LoadingProvider } from './LoadingContext';

const AppProvider: React.FC = ({ children }) => (
  <AuthProvider>
    <LoadingProvider>{children}</LoadingProvider>
  </AuthProvider>
);

export default AppProvider;
