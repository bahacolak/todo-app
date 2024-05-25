const express = require('express');
const {
  createTodo,
  editTodo,
  deleteTodo,
} = require('../controllers/todoController');
const authenticate = require('../middlewares/authenticate');
const multer = require('multer');
const path = require('path');

const router = express.Router();

const uploadsDir = path.join(__dirname, '../uploads');
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

router.post('/', authenticate, upload.single('image'), createTodo);
router.put('/:id', authenticate, upload.single('image'), editTodo);
router.delete('/:id', authenticate, deleteTodo);

module.exports = router;
