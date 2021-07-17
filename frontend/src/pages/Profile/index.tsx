import React, { useCallback, useState } from 'react';
import { Button, Form, Input } from 'antd';
import { toast } from 'react-toastify';

import { Container } from './styles';
import api from '../../services/api';
import useAuth from '../../hooks/auth/useAuth';

const Profile: React.FC = () => {
  const { user, updateUser } = useAuth();
  const [loading, setLoading] = useState(false);
  const [passwordFilled, setPasswordFilled] = useState(false);

  const handleFinish = useCallback(
    async (data) => {
      setLoading(true);
      try {
        const response = await api.put('profile', data);
        updateUser(response.data);
        toast.success('User updated with success!');
        setLoading(false);
      } catch (error) {
        if (
          error.response &&
          error.response.data &&
          error.response.data.message
        ) {
          toast.error(error.response.data.message);
        } else {
          toast.error('Error trying to update account!');
        }
        setLoading(false);
      }
    },
    [updateUser],
  );

  const handleChangePassword = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setPasswordFilled(!!e.target.value);
    },
    [],
  );

  return (
    <Container>
      <h2>Profile</h2>
      <Form layout="vertical" onFinish={handleFinish} initialValues={user}>
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

        <Form.Item label="Old Password" name="old_password">
          <Input.Password />
        </Form.Item>

        <Form.Item label="Password" name="password">
          <Input.Password onChange={handleChangePassword} />
        </Form.Item>

        <Form.Item
          label="Password Confirmation"
          name="password_confirmation"
          rules={[
            {
              validator: (_, value) => {
                if (passwordFilled && !value) {
                  return Promise.reject(
                    new Error('Please input your password confirmation!'),
                  );
                }
                return Promise.resolve();
              },
            },
          ]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" loading={loading}>
            Save
          </Button>
        </Form.Item>
      </Form>
    </Container>
  );
};

export default Profile;
