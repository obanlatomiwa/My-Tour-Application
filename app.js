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

module.exports = app;
