import React, { useCallback, useState } from 'react';
import { Button, Form, Input } from 'antd';
import { toast } from 'react-toastify';
import { Link, useHistory } from 'react-router-dom';

import { ButtonsContainer, Container } from './styles';
import api from '../../services/api';

const SignIn: React.FC = () => {
  const history = useHistory();
  const [loading, setLoading] = useState(false);

  const handleFinish = useCallback(
    async (data) => {
      setLoading(true);
      try {
        await api.post('users', data);
        toast.success('User created with success!');
        history.push('login');
      } catch (error) {
        if (
          error.response &&
          error.response.data &&
          error.response.data.message
        ) {
          toast.error(error.response.data.message);
        } else {
          toast.error('Error trying to create account!');
        }
        setLoading(false);
      }
    },
    [history],
  );

  return (
    <Container>
      <h2>Create Account</h2>
      <Form layout="vertical" onFinish={handleFinish}>
        <Form.Item
          label="Name"
          name="name"
          rules={[{ required: true, message: 'Please input your name!' }]}
        >
          <Input />
        </Form.Item>

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
              Create Account
            </Button>
            <Link to="login">Already have an account? Click here!</Link>
          </ButtonsContainer>
        </Form.Item>
      </Form>
    </Container>
  );
};

export default SignIn;
