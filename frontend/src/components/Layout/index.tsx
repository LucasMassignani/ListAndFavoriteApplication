import React, { useCallback } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import useAuth from '../../hooks/auth/useAuth';

import {
  Container,
  Header,
  UserButtonsContainer,
  ContentContainer,
  ButtonLogout,
} from './styles';

const Layout: React.FC = ({ children }) => {
  const { user, signOut } = useAuth();

  const handleClickLogout = useCallback(() => {
    signOut();
    toast.success('You have successfully logged out!');
  }, [signOut]);

  return (
    <Container>
      <Header>
        <h1>
          <Link to="/"> My Favorite List</Link>
        </h1>
        {user ? (
          <UserButtonsContainer>
            <Link to="profile">{user.name}</Link>
            <Link to="favorite">Favorite</Link>
            <ButtonLogout onClick={handleClickLogout}>Logout</ButtonLogout>
          </UserButtonsContainer>
        ) : (
          <UserButtonsContainer>
            <Link to="login">Login</Link>
            <Link to="signin">Sign In</Link>
          </UserButtonsContainer>
        )}
      </Header>
      <ContentContainer>{children}</ContentContainer>
    </Container>
  );
};

export default Layout;
