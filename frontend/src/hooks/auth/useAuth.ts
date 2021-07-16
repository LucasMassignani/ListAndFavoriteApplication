import { useContext } from 'react';
import AuthContext from './AuthContext';
import IAuthContextData from './interfaces/IAuthContextData';

function useAuth(): IAuthContextData {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }

  return context;
}

export default useAuth;
