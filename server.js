const mongoose = require('mongoose');
const dotenv = require('dotenv');
// db
// const fs = require('fs');
// const Tour = require('./models/tourModel');
// const User = require('./models/userModel');
// const Review = require('./models/reviewModel');

// catching uncaught exception
process.on('uncaughtException', (err) => {
  console.log(err.name, err.message);
  console.log('unhandled exception, shutting down');
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
  console.log('unhandled rejection, shutting down');
  server.close(() => {
    process.exit(1);
  });
});



// console.log(process.env.DATABASE);
// // // read file
// const tours = JSON.parse(
//   fs.readFileSync(`./dev-data/data/tours.json`, 'utf-8')
// );
// const users = JSON.parse(
//   fs.readFileSync(`./dev-data/data/users.json`, 'utf-8')
// );
// const reviews = JSON.parse(
//   fs.readFileSync(`./dev-data/data/reviews.json`, 'utf-8')
// );

// // import data into DB
// const importData = async () => {
//   try {
//     await Tour.create(tours);
//     await User.create(users, { validateBeforeSave: false });
//     await Review.create(reviews);
//     console.log('tour data successfully imported');
//   } catch (err) {
//     console.log(err);
//   }
//   process.exit();
// };

// // delete all data from DB
// const deleteData = async () => {
//   try {
//     await Tour.deleteMany();
//     await User.deleteMany();
//     await Review.deleteMany();
//     console.log('data successfully deleted');
//   } catch (err) {
//     console.log(err);
//   }
//   process.exit();
// };
// deleteData();
// importData();
