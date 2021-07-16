import React from 'react';
import { Link } from 'react-router-dom';

import {
  Container,
  Header,
  UserButtonsContainer,
  SearchArtContainer,
  TitleAndSearchContainer,
  ContentContainer,
} from './styles';

const Layout: React.FC = ({ children }) => {
  return (
    <Container>
      <Header>
        <TitleAndSearchContainer>
          <h1>My Favorite Arts</h1>
          <SearchArtContainer>
            <input type="text" />
          </SearchArtContainer>
        </TitleAndSearchContainer>
        <UserButtonsContainer>
          <Link to="singin">Login</Link>
          <Link to="singup">Sing Up</Link>
        </UserButtonsContainer>
      </Header>
      <ContentContainer>{children}</ContentContainer>
    </Container>
  );
};

export default Layout;
