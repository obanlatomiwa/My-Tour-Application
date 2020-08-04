// main express application

// core modules
const fs = require('fs');

// 3rd-party modules
const express = require('express');
const morgan = require('morgan');

// my modules
const tourRouter = require('./routes/tourRoute');
const userRouter = require('./routes/userRoute');

// setting up express app
const app = express();

// MIDDLEWARE
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// app middleware
app.use(express.json());

// serving static files
app.use(express.static(`${__dirname}/public`));

// mounting routers
app.use('/api/v1/tours', tourRouter);
app.use('/api/v1/users', userRouter);

// handling non-existing routes
app.all('*', (req, res, next) => {
  // res.status(404).json({
  //   status: 'failed',
  //   message: `Can't find ${req.originalUrl} on this server`,
  // });

  const err = new Error(`Can't find ${req.originalUrl} on this server`);
  err.status = 'failed';
  err.statusCode = 404;
  next(err);
});

// error handling middleware
app.use((err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || 'error';
  res.status(err.statusCode).json({
    status: err.status,
    message: err.message,
  });
});

module.exports = app;
