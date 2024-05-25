// backend/index.js

const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();

app.use(bodyParser.json());
app.use(cors());

const authRouter = require('./routes/auth');
app.use('/auth', authRouter);


const todosRouter = require('./routes/todos');
app.use('/todos', todosRouter);

mongoose.connect('mongodb://0.0.0.0:27017/todoapp', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB');
});

app.listen(5000, () => {
  console.log('Server is running on port 5000');
});
