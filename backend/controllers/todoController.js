const Todo = require('../models/Todo');
const fs = require('fs');
const path = require('path');

const uploadsDir = path.join(__dirname, '../uploads');
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

exports.createTodo = async (req, res) => {
  const { title, description, tags } = req.body;
  const image = req.file ? req.file.path : null;
  try {
    const todo = new Todo({
      userId: req.userId,
      title,
      description,
      tags: tags ? tags.split(',') : [],
      image,
    });
    await todo.save();
    res.status(201).send(todo);
  } catch (error) {
    res.status(400).send('Error creating todo');
  }
};

exports.editTodo = async (req, res) => {
  const { id } = req.params;
  const { title, description, tags } = req.body;
  const image = req.file ? req.file.path : null;

  try {
    const todo = await Todo.findOne({ _id: id, userId: req.userId });
    if (!todo) {
      return res.status(404).send('To-Do not found or not authorized');
    }

    if (title) todo.title = title;
    if (description) todo.description = description;
    if (tags) todo.tags = tags.split(',');
    if (image) {
      if (todo.image) {
        fs.unlink(todo.image, (err) => {
          if (err) console.log('Failed to delete old image:', err);
        });
      }
      todo.image = image;
    }

    await todo.save();
    res.send(todo);
  } catch (error) {
    res.status(400).send('Error updating todo');
  }
};

exports.deleteTodo = async (req, res) => {
  const { id } = req.params;

  try {
    const todo = await Todo.findOneAndDelete({ _id: id, userId: req.userId });
    if (!todo) {
      return res.status(404).send('To-Do not found or not authorized');
    }

    if (todo.image) {
      fs.unlink(todo.image, (err) => {
        if (err) console.log('Failed to delete image:', err);
      });
    }

    res.send('To-Do deleted successfully');
  } catch (error) {
    res.status(400).send('Error deleting todo');
  }
};

exports.fetchTodos = async (req, res) => {
  try {
    const todos = await Todo.find({ userId: req.userId });
    res.json(todos);
  } catch (error) {
    res.status(500).send('Error fetching user todos.');
  }
};
