const express = require('express');

// route handlers for users
const getUsers = (req, res) => {
  res.status(500).json({
    status: 'success',
    message: 'not defined',
  });
};

const getUser = (req, res) => {
  res.status(500).json({
    status: 'success',
    message: 'not defined',
  });
};

const postUser = (req, res) => {
  res.status(500).json({
    status: 'success',
    message: 'not defined',
  });
};

const patchUser = (req, res) => {
  res.status(500).json({
    status: 'success',
    message: 'not defined',
  });
};

const deleteUser = (req, res) => {
  res.status(500).json({
    status: 'success',
    message: 'not defined',
  });
};

// users routes
const router = express.Router();
router.route('/').get(getUsers).post(postUser);
router.route('/:id').get(getUser).patch(patchUser).delete(deleteUser);

module.exports = router;