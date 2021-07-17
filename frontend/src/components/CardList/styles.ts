import styled from 'styled-components';
import { Empty } from 'antd';

export const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const TitleContainer = styled.div`
  display: flex;
  align-items: center;

  margin-bottom: 15px;
  h2 {
    margin: 0 15px 0 0;
  }
`;

export const CustomEmpty = styled(Empty)`
  color: #000;
`;
