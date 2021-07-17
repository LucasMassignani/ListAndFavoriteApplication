import styled from 'styled-components';

export const Container = styled.div`
  width: 100vw;
  height: 100vh;
  overflow-x: hidden;
`;

export const Header = styled.div`
  width: 100%;
  min-height: 75px;

  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  padding: 5px 30px;
  background-color: #840c0c;
  h1 {
    padding: 0;
    margin: 0;
    font-size: 30px;
    color: #fff;

    a {
      text-decoration: inherit;
      color: inherit;
      cursor: pointer;
    }
  }

  @media only screen and (max-width: 747px) {
    justify-content: center;
  }
`;

export const UserButtonsContainer = styled.div`
  > * {
    margin-left: 15px;
  }

  > a {
    color: #fff;
  }
`;

export const ContentContainer = styled.div`
  display: flex;
  justify-content: center;
`;

export const ButtonLogout = styled.button`
  background: none;
  border: 0;
`;
