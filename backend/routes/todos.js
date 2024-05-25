const express = require('express');
const Todo = require('../models/Todo');
const jwt = require('jsonwebtoken');
const multer = require('multer');
const fs = require('fs');
const path = require('path');
const router = express.Router();

const authenticate = (req, res, next) => {
  const token = req.header('Authorization').replace('Bearer ', '');
  if (!token) return res.status(401).send('Access denied');
  try {
    const decoded = jwt.verify(token, 'SECRET_KEY');
    req.userId = decoded.userId;
    next();
  } catch (error) {
    res.status(400).send('Invalid token');
  }
};

const uploadsDir = path.join(__dirname, '../uploads');
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadsDir);
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname);
  },
});

const fileFilter = (req, file, cb) => {
  if (file.mimetype.startsWith('image/')) {
    cb(null, true);
  } else {
    cb(new Error('Invalid file type. Only images are allowed.'), false);
  }
};

const upload = multer({ storage, fileFilter });

// Create To-Do
router.post('/', authenticate, upload.single('image'), async (req, res) => {
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
});

// Edit To-Do
router.put('/:id', authenticate, upload.single('image'), async (req, res) => {
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
      // Optionally, delete the old image
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
});

// Delete To-Do
router.delete('/:id', authenticate, async (req, res) => {
  const { id } = req.params;

  try {
    const todo = await Todo.findOneAndDelete({ _id: id, userId: req.userId });
    if (!todo) {
      return res.status(404).send('To-Do not found or not authorized');
    }

    // Optionally, delete the image associated with the to-do
    if (todo.image) {
      fs.unlink(todo.image, (err) => {
        if (err) console.log('Failed to delete image:', err);
      });
    }

    res.send('To-Do deleted successfully');
  } catch (error) {
    res.status(400).send('Error deleting todo');
  }
});

module.exports = router;
