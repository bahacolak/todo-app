// src/pages/TodoList.js

import React, { useState, useEffect } from 'react';
import { List, Avatar, message } from 'antd';
import axios from 'axios';

const TodoList = ({ token }) => {
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchTodos = async () => {
      setLoading(true);
      try {
        const response = await axios.get('http://localhost:5000/todos', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setTodos(response.data);
      } catch (error) {
        message.error('Failed to load todos');
      } finally {
        setLoading(false);
      }
    };
    fetchTodos();
  }, [token]);

  // Diğer CRUD işlemleri ve UI bileşenleri burada olacak

  return (
    <div>
      <h1>Your Todos</h1>
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
      />
    </div>
  );
};

export default TodoList;
