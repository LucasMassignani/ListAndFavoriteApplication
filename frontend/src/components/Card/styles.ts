import styled from 'styled-components';

export const Container = styled.div`
  img {
    object-fit: cover;
  }
`;

export const ButtonContainer = styled.div`
  margin-top: -7px;
  margin-bottom: 15px;
  width: 200px;
  display: flex;
`;

export const DetailsButton = styled.button`
  flex: 1;
  border-bottom-right-radius: 0px;
  border-bottom-left-radius: 5px;
  border: 1px solid black;
  background: #1890ff;
  border-color: #1890ff;

  &:hover {
    background-color: #3fa9ff;
  }

  &:active {
    background-color: #096dd9;
  }

  &:disabled {
    background-color: #1890ff66;
  }
`;

export const FavoriteButton = styled.button`
  flex: 1;
  border-bottom-left-radius: 0px;
  border-bottom-right-radius: 5px;

  border: 1px solid #d43a3a;
  background: #d43a3a;

  &:hover {
    background-color: #da5656;
  }

  &:active {
    background-color: #b12727;
  }
  &:disabled {
    background-color: #d43a3a66;
  }
`;
