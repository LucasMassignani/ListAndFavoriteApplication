import { Spin } from 'antd';
import React from 'react';

import { Container } from './styles';

const Loading: React.FC = () => {
  return (
    <Container>
      <Spin tip="Loading..." />
    </Container>
  );
};

export default Loading;
