import React, { useCallback, useState } from 'react';
import api from '../../services/api';
import AuthContext from './AuthContext';
import IAuthState from './interfaces/IAuthState';
import IUser from './interfaces/IUser';

const AuthProvider: React.FC = ({ children }) => {
  const [data, setData] = useState<IAuthState>(() => {
    const token = localStorage.getItem('@ListAndFavorite:token');
    const user = localStorage.getItem('@ListAndFavorite:user');

    if (token && user) {
      api.defaults.headers.authorization = `Bearer ${token}`;

      return { token, user: JSON.parse(user) };
    }

    return {} as IAuthState;
  });

  const signIn = useCallback(async ({ email, password }) => {
    const response = await api.post('sessions', {
      email,
      password,
    });

    const { token, user } = response.data;

    localStorage.setItem('@ListAndFavorite:token', token);
    localStorage.setItem('@ListAndFavorite:user', JSON.stringify(user));

    api.defaults.headers.authorization = `Bearer ${token}`;

    setData({ token, user });
  }, []);

  const signOut = useCallback(() => {
    localStorage.removeItem('@ListAndFavorite:token');
    localStorage.removeItem('@ListAndFavorite:user');

    setData({} as IAuthState);
  }, []);

  const updateUser = useCallback((updateData: IUser) => {
    localStorage.setItem('@ListAndFavorite:user', JSON.stringify(updateData));
    setData((state) => {
      return {
        token: state.token,
        user: updateData,
      };
    });
  }, []);

  return (
    <AuthContext.Provider
      value={{ user: data.user, signIn, signOut, updateUser }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
