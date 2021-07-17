import React from 'react';
import { Link } from 'react-router-dom';

import {
  Container,
  Header,
  UserButtonsContainer,
  ContentContainer,
} from './styles';

const Layout: React.FC = ({ children }) => {
  return (
    <Container>
      <Header>
        <h1>
          <Link to="/"> My Favorite Arts</Link>
        </h1>
        <UserButtonsContainer>
          <Link to="login">Login</Link>
          <Link to="signin">Sign In</Link>
        </UserButtonsContainer>
      </Header>
      <ContentContainer>{children}</ContentContainer>
    </Container>
  );
};

export default Layout;
