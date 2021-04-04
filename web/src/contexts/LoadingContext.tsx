import { createContext, useContext, useState } from 'react';
import Loading from '../components/Loading';

interface LoadingContextData {
  display: () => void;
  hide: () => void;
}

const LoadingContext = createContext<LoadingContextData>(
  {} as LoadingContextData
);

export const LoadingProvider: React.FC = ({ children }) => {
  const [loading, setLoading] = useState(false);

  const display = () => {
    setLoading(true);
  };

  const hide = () => {
    setLoading(false);
  };

  return (
    <LoadingContext.Provider value={{ display, hide }}>
      {children}
      <Loading display={loading} />
    </LoadingContext.Provider>
  );
};

export function useLoading(): LoadingContextData {
  const context = useContext(LoadingContext);

  if (!context)
    throw new Error('useLoading must be used within an LoadingProvider');

  return context;
}
