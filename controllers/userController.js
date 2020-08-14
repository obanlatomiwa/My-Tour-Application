const multer = require('multer');
const sharp = require('sharp');
const User = require('../models/userModel');
const catchAsyncError = require('../utils/catchAsyncError');
const AppError = require('../utils/appError');
const factory = require('./handlerFactory');

//file upload

//  using a storage system
// const multerStorage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, 'public/img/users');
//   },
//   filename: (req, file, cb) => {
//     const fileExtension = file.mimetype.split('/')[1];
//     cb(null, `user-${req.user.id}-${Date.now()}.${fileExtension}`);
//   },
// });

// using a buffer
const multerStorage = multer.memoryStorage();

const multerFilter = (req, file, cb) => {
  if (file.mimetype.startsWith('image')) {
    cb(null, true);
  } else {
    cb(new AppError('Please upload only images', 404), false);
  }
};

const upload = multer({
  storage: multerStorage,
  fileFilter: multerFilter,
});

exports.uploadUserPhoto = upload.single('photo');

exports.resizeUserphoto = catchAsyncError(async (req, res, next) => {
  if (!req.file) return next();
  req.file.filename = `user-${req.user.id}-${Date.now()}.jpeg`;
  await sharp(req.file.buffer)
    .resize(500, 500)
    .toFormat('jpeg')
    .jpeg({ quality: 90 })
    .toFile(`public/img/users/${req.file.filename}`);

  next();
});

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
  if (req.file) filteredBody.photo = req.file.filename;

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
