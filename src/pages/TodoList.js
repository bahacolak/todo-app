import React, { useState, useEffect, useCallback } from 'react';
import { List, Avatar, message, Button, Modal, Form, Input, Upload, Popconfirm } from 'antd';
import { PlusOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';
import axios from 'axios';

const TodoList = ({ token }) => {
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [form] = Form.useForm();
  const [fileList, setFileList] = useState([]);
  const [editingTodo, setEditingTodo] = useState(null);

  const fetchTodos = useCallback(async () => {
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
  }, [token]);

  useEffect(() => {
    fetchTodos();
  }, [fetchTodos]);

  const handleAddOrEditTodo = async (values) => {
    const formData = new FormData();
    Object.keys(values).forEach((key) => formData.append(key, values[key]));
    if (fileList.length > 0) {
      formData.append('image', fileList[0].originFileObj);
    }

    try {
      if (editingTodo) {
        await axios.put(`http://localhost:5000/todos/${editingTodo._id}`, formData, {
          headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'multipart/form-data' },
        });
        message.success('Todo updated successfully');
      } else {
        await axios.post('http://localhost:5000/todos', formData, {
          headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'multipart/form-data' },
        });
        message.success('Todo added successfully');
      }

      setModalVisible(false);
      form.resetFields();
      setFileList([]);
      setEditingTodo(null);
      fetchTodos();
    } catch (error) {
      message.error('Failed to save todo');
    }
  };

  const handleFileChange = ({ fileList }) => {
    setFileList(fileList);
  };

  const handleEditTodo = (todo) => {
    setEditingTodo(todo);
    setModalVisible(true);
    form.setFieldsValue({
      title: todo.title,
      description: todo.description,
      tags: todo.tags.join(','),
    });
  };

  const handleDeleteTodo = async (todoId) => {
    try {
      await axios.delete(`http://localhost:5000/todos/${todoId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      message.success('Todo deleted successfully');
      fetchTodos();
    } catch (error) {
      message.error('Failed to delete todo');
    }
  };

  const handleConfirmDelete = (todoId) => {
    handleDeleteTodo(todoId);
  };

  const handleCancelDelete = () => {
    message.info('Delete operation canceled.');
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
          <List.Item
            actions={[
              <Button
                type="text"
                icon={<EditOutlined />}
                onClick={() => handleEditTodo(todo)}
              />,
              <Popconfirm
                title="Are you sure you want to delete this todo?"
                onConfirm={() => handleConfirmDelete(todo._id)}
                onCancel={handleCancelDelete}
                okText="Yes"
                cancelText="No"
              >
                <Button type="text" danger icon={<DeleteOutlined />} />
              </Popconfirm>,
            ]}
          >
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
        title={editingTodo ? 'Edit Todo' : 'Add Todo'}
        visible={modalVisible}
        onCancel={() => {
          setModalVisible(false);
          setEditingTodo(null);
        }}
        footer={null}
      >
        <Form form={form} onFinish={handleAddOrEditTodo} initialValues={editingTodo}>
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
            <Button type="primary" htmlType="submit">{editingTodo ? 'Save' : 'Add'}</Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default TodoList;
