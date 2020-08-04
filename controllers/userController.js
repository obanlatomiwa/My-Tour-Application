const User = require('../models/userModel');
const catchAsyncError = require('../utils/catchAsyncError');

exports.getUsers = catchAsyncError(async (req, res, next) => {
  const users = await User.find();

  // send response
  res.status(200).json({
    status: 'success',
    results: users.length,
    data: {
      users,
    },
  });
});

exports.getUser = (req, res) => {
  res.status(500).json({
    status: 'success',
    message: 'not defined',
  });
};

exports.postUser = (req, res) => {
  res.status(500).json({
    status: 'success',
    message: 'not defined',
  });
};

exports.patchUser = (req, res) => {
  res.status(500).json({
    status: 'success',
    message: 'not defined',
  });
};

exports.deleteUser = (req, res) => {
  res.status(500).json({
    status: 'success',
    message: 'not defined',
  });
};
