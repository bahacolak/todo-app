import React, { useState } from 'react';
import { Form, Input, Button, message } from 'antd';
import axios from 'axios';

const Register = () => {
  const [loading, setLoading] = useState(false);

  const onFinish = async (values) => {
    setLoading(true);
    try {
      await axios.post('http://localhost:5000/auth/register', values);
      message.success('Registration successful. Please log in.');
    } catch (error) {
      message.error('Registration failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Form name="register" onFinish={onFinish}>
      <Form.Item name="username" rules={[{ required: true, message: 'Please input your username!' }]}>
        <Input placeholder="Username" />
      </Form.Item>
      <Form.Item name="password" rules={[{ required: true, message: 'Please input your password!' }]}>
        <Input.Password placeholder="Password" />
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit" loading={loading}>
          Register
        </Button>
      </Form.Item>
    </Form>
  );
};

export default Register;
