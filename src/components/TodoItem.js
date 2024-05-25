import React from 'react';
import { List, Avatar, Button } from 'antd';

const TodoItem = ({ todo, onDelete, onEdit }) => (
  <List.Item
    actions={[
      <Button onClick={() => onEdit(todo)}>Edit</Button>,
      <Button danger onClick={() => onDelete(todo._id)}>Delete</Button>,
    ]}
  >
    <List.Item.Meta
      avatar={todo.image && <Avatar src={`http://localhost:5000/${todo.image}`} />}
      title={todo.title}
      description={todo.description}
    />
  </List.Item>
);

export default TodoItem;
