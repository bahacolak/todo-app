// backend/routes/auth.js

const express = require('express');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const router = express.Router();

router.post('/register', async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = new User({ username, password });
    await user.save();
    res.status(201).send('User registered');
  } catch (error) {
    res.status(400).send('Error registering user');
  }
});

router.post('/login', async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await User.findOne({ username });
    if (!user) return res.status(400).send('User not found');
    user.comparePassword(password, (err, isMatch) => {
      if (!isMatch || err) return res.status(400).send('Invalid credentials');
      const token = jwt.sign({ userId: user._id }, 'SECRET_KEY');
      res.send({ token });
    });
  } catch (error) {
    res.status(400).send('Error logging in');
  }
});

module.exports = router;
