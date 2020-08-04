const User = require('../models/userModel');
const catchAsyncError = require('../utils/catchAsyncError');

exports.signup = catchAsyncError(async (req, res, next) => {
  const newUser = await User.create(req.body);
  res.status(201).json({
    status: 'success',
    data: {
      user: newUser,
    },
  });
});
