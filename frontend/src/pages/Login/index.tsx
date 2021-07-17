import React, { useCallback, useState } from 'react';
import { Button, Form, Input } from 'antd';
import { toast } from 'react-toastify';
import { Link, useHistory } from 'react-router-dom';

import { ButtonsContainer, Container } from './styles';
import useAuth from '../../hooks/auth/useAuth';

const Login: React.FC = () => {
  const history = useHistory();
  const { signIn } = useAuth();

  const [loading, setLoading] = useState(false);

  const handleFinish = useCallback(
    async (data) => {
      setLoading(true);
      try {
        await signIn(data);
        toast.success('You have successfully logged in!');

        history.push('/');
      } catch (error) {
        if (
          error.response &&
          error.response.data &&
          error.response.data.message
        ) {
          toast.error(error.response.data.message);
        } else {
          toast.error('Error trying to login!');
        }
        setLoading(false);
      }
    },
    [history, signIn],
  );

  return (
    <Container>
      <h2>Login</h2>
      <Form layout="vertical" onFinish={handleFinish}>
        <Form.Item
          label="E-mail"
          name="email"
          rules={[
            {
              required: true,
              message: 'Please input your e-mail!',
              type: 'email',
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Password"
          name="password"
          rules={[{ required: true, message: 'Please input your password!' }]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item>
          <ButtonsContainer>
            <Button type="primary" htmlType="submit" loading={loading}>
              Login
            </Button>
            <Link to="signin">Do not have an account? Click here!</Link>
          </ButtonsContainer>
        </Form.Item>
      </Form>
    </Container>
  );
};

export default Login;
