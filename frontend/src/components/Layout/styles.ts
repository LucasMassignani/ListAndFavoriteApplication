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
  justify-content: center;
  flex-wrap: wrap;
  padding: 5px 30px;
  background-color: #840c0c;
  h1 {
    padding: 0;
    margin: 0;
    font-size: 30px;
    color: #fff;
  }
`;

export const TitleAndSearchContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: flex-start;
  flex: 1;

  @media only screen and (max-width: 747px) {
    justify-content: center;
  }
`;

export const SearchArtContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  > input {
    padding: 3px;
    width: 300px;
    color: #000;
    border: 1px solid #000;
    border-radius: 5px;
    margin-left: 15px;
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
