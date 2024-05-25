import axios from 'axios';

const API_URL = 'http://localhost:5000/todos';

export const fetchTodos = async (token) => {
  const response = await axios.get(API_URL, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};

export const createTodo = async (token, todo) => {
  const response = await axios.post(API_URL, todo, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};

export const updateTodo = async (token, id, updatedTodo) => {
  const response = await axios.put(`${API_URL}/${id}`, updatedTodo, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};

export const deleteTodo = async (token, id) => {
  await axios.delete(`${API_URL}/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
};

