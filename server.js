const mongoose = require('mongoose');
const dotenv = require('dotenv');

// catching uncaught exception
process.on('uncaughtException', (err) => {
  console.log(err.name, err.message);
  console.log('unhandled exception, 💥 shutting down');
  process.exit(1);
});

dotenv.config({ path: './.env' });
const app = require('./app');

const DB = process.env.DATABASE.replace('<PASSWORD>', process.env.PASSWORD);

mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  })
  .then(() => {
    console.log('db connected');
  });

//listening to server
const port = process.env.PORT || 8000;

const server = app.listen(port, () => {
  console.log(`listening on port ${port}`);
});

// catching unhandled rejection
process.on('unhandledRejection', (err) => {
  console.log(err.name, err.message);
  console.log('unhandled rejection,💥 shutting down');
  server.close(() => {
    process.exit(1);
  });
});

process.on('SIGTERM', () => {
  console.log('SIGTERM RECEIVED, Shutting down');
  server.close(() => {
    console.log('💥 Process terminated');
  });
});
