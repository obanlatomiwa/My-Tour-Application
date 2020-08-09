const User = require('../models/userModel');
const catchAsyncError = require('../utils/catchAsyncError');
const AppError = require('../utils/appError');
const factory = require('./handlerFactory');

// helper functions
const filterObj = (obj, ...allowedFields) => {
  const newObj = {};
  Object.keys(obj).forEach((el) => {
    if (allowedFields.includes(el)) newObj[el] = obj[el];
  });
  return newObj;
};

exports.getUsers = factory.getAll(User);
exports.getUser = factory.getOne(User);
// do not update passwords with this!!!
exports.patchUser = factory.updateOne(User);
exports.deleteUser = factory.deleteOne(User);

exports.postUser = (req, res) => {
  res.status(500).json({
    status: 'success',
    message: 'not defined, please use /signup instead',
  });
};

exports.getMe = (req, res, next) => {
  req.params.id = req.user.id;
  next();
};

exports.updateMe = catchAsyncError(async (req, res, next) => {
  // disaallow POST requests for password or passwordConfirm data
  if (req.body.password || req.body.passwordConfirm) {
    next(new AppError('Not Allowed', 400));
  }

  // filtered unwanted field names that are not allowed to be updated
  const filteredBody = filterObj(req.body, 'name', 'email');

  // update user account
  const updatedUser = await User.findByIdAndUpdate(req.user.id, filteredBody, {
    new: true,
    runValidators: true,
  });

  res.status(200).json({
    status: 'success',
    data: {
      user: updatedUser,
    },
  });
});

exports.deleteMe = catchAsyncError(async (req, res, next) => {
  await User.findByIdAndUpdate(req.user.id, { active: false });
  res.status(204).json({
    status: 'success',
    data: null,
  });
});

// exports.deleteUser = (req, res) => {
//   res.status(500).json({
//     status: 'success',
//     message: 'not defined',
//   });
// };
