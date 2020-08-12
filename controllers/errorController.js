/* eslint-disable node/no-unsupported-features/es-syntax */
const AppError = require('../utils/appError');

// DB Errors
const handleCastErrorDB = (err) => {
  const message = `Invalid ${err.path}: ${err.value}`;
  return new AppError(message, 400);
};

const handleDuplicateFieldsDB = (err) => {
  const value = err.keyValue.name;
  const message = `Duplicate field value: ${value}. Try another value`;
  return new AppError(message, 400);
};

const handleValidationErrorDB = (err) => {
  const errors = Object.values(err.errors).map((el) => el.properties.message);
  const message = `Invalid input data ${errors.join('. ')}`;
  return new AppError(message, 400);
};

// authetication and authorization errors
const handleJWTError = () =>
  new AppError('Invalid Token, Please log in again', 401);

const handleJWTExpiredError = () =>
  new AppError('Expired Token! Please login again', 401);

// development err
const sendErrorDevelopment = (err, req, res) => {
  // API
  if (req.originalUrl.startsWith('/api')) {
    return res.status(err.statusCode).json({
      status: err.status,
      message: err.message,
      error: err,
      stack: err.stack,
    });
  }
  // Render Website
  console.error('ERROR', err);
  return res.status(err.statusCode).render('error', {
    title: 'Something went wrong!',
    msg: err.message,
  });
};

const sendErrorProduction = (err, req, res) => {
  if (req.originalUrl.startsWith('/api')) {
    // API
    // operational errors we know
    if (err.isOperational) {
      return res.status(err.statusCode).json({
        status: err.status,
        message: err.message,
      });
      // programming or other errors unknown, don't leak error details to client
    }
    console.error('ERROR', err);

    return res.status(500).json({
      status: 'error',
      message: 'Something went very wrong',
    });
  }
  // Render Website
  // operational errors we know
  if (err.isOperational) {
    return res.status(err.statusCode).render('error', {
      title: 'Something went wrong!',
      msg: err.message,
    });
    // programming or other errors unknown, don't leak error details to client
  }
  console.error('ERROR', err);
  return res.status(err.statusCode).render('error', {
    title: 'Something went wrong!',
    msg: 'Please try again later.!',
  });
};

module.exports = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || 'error';

  // handling errors for development and production
  if (process.env.NODE_ENV === 'development') {
    sendErrorDevelopment(err, req, res);
  } else if (process.env.NODE_ENV === 'production') {
    let error = { ...err };
    error.message = err.message;
    if (error.kind === 'ObjectId') error = handleCastErrorDB(error);
    // if (error.name === 'CastError') error = handleCastErrorDB(error);
    if (error.code === 11000) error = handleDuplicateFieldsDB(error);
    if (error._message === 'Validation failed')
      error = handleValidationErrorDB(error);

    // invalid web token error
    if (error.name === 'JsonWebTokenError') error = handleJWTError();
    if (error.name === 'TokenExpiredError') error = handleJWTExpiredError();

    sendErrorProduction(error, req, res);
  }
};
