import React from 'react';
import { ToastContainer } from 'react-toastify';

import AuthProvider from './auth';

const AppProvider: React.FC = ({ children }) => {
  return (
    <AuthProvider>
      {children}
      <ToastContainer />
    </AuthProvider>
  );
};

export default AppProvider;
