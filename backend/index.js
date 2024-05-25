const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const connectDB = require('./config/db');
const authRouter = require('./routes/auth');
const todosRouter = require('./routes/todos');

const app = express();

connectDB();

app.use(bodyParser.json());
app.use(cors());

app.use('/auth', authRouter);
app.use('/todos', todosRouter);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
