// core modules
const fs = require('fs');
const tourRouter = require('./routes/tourRoute')
const userRouter = require('./routes/userRoute')


// 3rd-party modules
const express = require('express');
const morgan = require('morgan');

// setting up express app
const app = express();

// MIDDLEWARE
app.use(morgan('dev'));

// app middleware
app.use(express.json());



// routers
app.use('/api/v1/tours', tourRouter);
app.use('/api/v1/users', userRouter);

//listening to server
const port = 8000;

app.listen(port, () => {
  console.log(`listening on port ${port}`);
});
