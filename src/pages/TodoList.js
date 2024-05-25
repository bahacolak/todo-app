import React, { useState, useEffect } from 'react';
import { List, Avatar, message, Button, Modal, Form, Input, Upload } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import axios from 'axios';

const TodoList = ({ token }) => {
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [form] = Form.useForm();
  const [fileList, setFileList] = useState([]);

  const fetchTodos = async () => {
    setLoading(true);
    try {
      const response = await axios.get('http://localhost:5000/todos/user', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setTodos(response.data);
    } catch (error) {
      message.error('Failed to load todos');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTodos();
  }, [token]);

  const handleAddTodo = async (values) => {
    const formData = new FormData();
    Object.keys(values).forEach((key) => formData.append(key, values[key]));
    if (fileList.length > 0) {
      formData.append('image', fileList[0].originFileObj);
    }
    try {
      await axios.post('http://localhost:5000/todos', formData, {
        headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'multipart/form-data' },
      });
      message.success('Todo added successfully');
      setModalVisible(false);
      form.resetFields();
      setFileList([]);
      fetchTodos();
    } catch (error) {
      message.error('Failed to add todo');
    }
  };

  const handleFileChange = ({ fileList }) => {
    setFileList(fileList);
  };

  return (
    <div>
      <h1>Your Todos</h1>
      <Button type="primary" onClick={() => setModalVisible(true)} icon={<PlusOutlined />}>
        Add Todo
      </Button>
      <List
        itemLayout="horizontal"
        dataSource={todos}
        renderItem={(todo) => (
          <List.Item>
            <List.Item.Meta
              avatar={todo.image && <Avatar src={`http://localhost:5000/${todo.image}`} />}
              title={todo.title}
              description={todo.description}
            />
          </List.Item>
        )}
        loading={loading}
      />
      <Modal
        title="Add Todo"
        visible={modalVisible}
        onCancel={() => setModalVisible(false)}
        footer={null}
      >
        <Form form={form} onFinish={handleAddTodo}>
          <Form.Item name="title" rules={[{ required: true, message: 'Please input the title!' }]}>
            <Input placeholder="Title" />
          </Form.Item>
          <Form.Item name="description">
            <Input.TextArea placeholder="Description" />
          </Form.Item>
          <Form.Item name="tags">
            <Input placeholder="Tags (comma separated)" />
          </Form.Item>
          <Form.Item name="image">
            <Upload
              name="image"
              beforeUpload={() => false}
              fileList={fileList}
              onChange={handleFileChange}
            >
              <Button icon={<PlusOutlined />}>Upload Image</Button>
            </Upload>
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">Add</Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default TodoList;
