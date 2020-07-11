// core modules
const fs = require('fs');

// my modules
const tourRouter = require('./routes/tourRoute');
const userRouter = require('./routes/userRoute');

// 3rd-party modules
const express = require('express');
const morgan = require('morgan');

// setting up express app
const app = express();

// MIDDLEWARE
app.use(morgan('dev'));

// app middleware
app.use(express.json());

// mounting routers
app.use('/api/v1/tours', tourRouter);
app.use('/api/v1/users', userRouter);

module.exports = app;
