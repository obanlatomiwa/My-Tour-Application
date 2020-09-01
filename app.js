// main express application

// core modules
// const fs = require('fs');

// 3rd-party modules
const express = require('express');
const path = require('path');
const morgan = require('morgan');
const rateLimit = require('express-rate-limit');
const helmet = require('helmet');
const xss = require('xss-clean');
const mongoSanitize = require('express-mongo-sanitize');
const hpp = require('hpp');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const compression = require('compression');

// my modules
const AppError = require('./utils/appError');
const globalErrorHandler = require('./controllers/errorController');
const tourRouter = require('./routes/tourRoute');
const userRouter = require('./routes/userRoute');
const reviewRouter = require('./routes/reviewRoute');
const viewsRouter = require('./routes/viewsRoute');
const bookingRouter = require('./routes/bookingRoute');

// setting up express app
const app = express();

// setting up pug in express
app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));

//  implementing cors
app.use(cors());
//app.options('*', cors());

// serving static files
app.use(express.static(path.join(__dirname, 'public')));

// GLOBAL MIDDLEWARE
// set security http headers
app.use(helmet());

// development logging
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// rate limiter
const limiter = rateLimit({
  max: 100,
  windowMs: 60 * 60 * 100,
  message: 'Too many requests, please try again in an hour',
});
app.use('/api', limiter);

// app middleware
// body parser, reads data from the body into req.body
app.use(express.json({ limit: '10Kb' }));
app.use(cookieParser());

// data sanization against NoSQL query injection
app.use(mongoSanitize());

// data sanitization against XSS
app.use(xss());

// cleaning/preventing parameter pollution
app.use(
  hpp({
    whitelist: [
      'duration',
      'ratingsQuantity',
      'ratingsAverage',
      'maxGroupSize',
      'price',
      'difficulty',
    ],
  })
);

app.use(compression());

// test middlewares
app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  // console.log(req.headers);
  next();
});

// mounting routers
app.use('/', viewsRouter);
app.use('/api/v1/tours', tourRouter);
app.use('/api/v1/users', userRouter);
app.use('/api/v1/reviews', reviewRouter);
app.use('/api/v1/bookings', bookingRouter);

// handling non-existing routes
app.all('*', (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server`, 404));
});

// error handling middleware
app.use(globalErrorHandler);

module.exports = app;
