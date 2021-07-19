import { Alert } from 'antd';
import styled from 'styled-components';

export const Container = styled.div`
  padding: 15px;
  width: 100%;
  max-width: 800px;
`;

export const FilterContainer = styled.div`
  display: flex;
  justify-content: flex-end;
`;

export const CustomAlert = styled(Alert)`
  margin: 10px 0;
  cursor: pointer;

  * {
    cursor: pointer;
  }
`;
