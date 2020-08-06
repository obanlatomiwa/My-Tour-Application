const { promisify } = require('util');
const jwt = require('jsonwebtoken');
const User = require('../models/userModel');
const catchAsyncError = require('../utils/catchAsyncError');
const AppError = require('../utils/appError');
const sendEmail = require('../utils/email');

const signToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

//signup
exports.signup = catchAsyncError(async (req, res, next) => {
  const newUser = await User.create({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
    passwordConfirm: req.body.passwordConfirm,
    passwordChangedAt: req.body.passwordChangedAt,
    role: req.body.role,
  });

  // token
  const token = signToken(newUser._id);
  res.status(201).json({
    token,
    status: 'success',
    data: {
      user: newUser,
    },
  });
});

// login
exports.login = catchAsyncError(async (req, res, next) => {
  const { email, password } = req.body;

  // check if email and password exist
  if (!email || !password) {
    return next(new AppError('Please provide email and password', 400));
  }

  // check if user and password is correct
  const user = await User.findOne({ email }).select('+password');

  if (!user || !(await user.correctPassword(password, user.password))) {
    return next(
      new AppError('Incorrect email or password, Please try again', 401)
    );
  }

  // if passed, send token to client
  const token = signToken(user._id);
  res.status(200).json({
    status: 'success',
    message: 'login successful',
    token,
  });
});

// protect routes---Implementing access to some routes for only autheticated users
exports.protectRoute = catchAsyncError(async (req, res, next) => {
  // get token and confirm its there
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    token = req.headers.authorization.split(' ')[1];
  }

  if (!token) {
    return next(
      new AppError('You are not logged in! Please log in to get access', 401)
    );
  }
  // verify token
  const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);
  console.log(decoded);

  // check if user still exists
  const currentUser = await User.findById(decoded.id);
  if (!currentUser) {
    next(new AppError('The user with this token no longer exist', 401));
  }

  // check if user changed password after token was issued
//   if (currentUser.changePasswordAfter(decoded.iat)) {
//     return next(
//       new AppError('User recently changed password! Please log in again', 401)
//     );
//   }

  // grant access to protected route
  req.user = currentUser;
  //   console.log(req.user);
  next();
});

// authorization
exports.restrictTo = (...roles) => {
  // roles = ['admin', 'lead-guide']
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return next(
        new AppError('You do not have permission to perform this action', 403)
      );
    }
    next();
  };
};

// forgot password
exports.forgotPassword = catchAsyncError(async (req, res, next) => {
  // get user based on post request email
  const user = await User.findOne({ email: req.body.email });
  if (!user) {
    return next(new AppError('There is no user with such email address', 404));
  }

  // generate random reset token
  const resetToken = user.createPasswordResetToken();
  await user.save({ validateBeforeSave: false });

  // send it to user email
  const resetURL = `${req.protocol}://${req.get(
    'host'
  )}/api/v1/users/resetPassword/${resetToken}`;

  const message = `Forgot your password? Submit your new password to: ${resetURL}.\n If you didn't make this request, Please ignore thiss email!`;
  try {
    await sendEmail({
      email: user.email,
      subject: "Your rest password token (It's only valid for 10 minutes )",
      message,
    });

    res.status(200).json({
      status: 'success',
      message: 'Token sent to recipient email',
    });
  } catch (err) {
    user.passwordResetToken = undefined;
    user.passwordResetExpires = undefined;
    await user.save({ validateBeforeSave: false });

    return next(
      new AppError(
        'There was an error trying to send the password reset token email, Please try again later',
        500
      )
    );
  }
});

// reset password
exports.resetPassword = (req, res, next) => {};
