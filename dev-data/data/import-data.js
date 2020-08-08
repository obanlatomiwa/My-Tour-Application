const fs = require('fs');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Tour = require('../../models/tourModel');

dotenv.config({ path: '../../.env' });


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

// read file
const tours = JSON.parse(fs.readFileSync(`${__dirname}/tours.json`, 'utf-8'));

// import data into DB
const importData = async () => {
  try {
    await Tour.create(tours);
    console.log('tour data successfully imported');
  } catch (err) {
    console.log(err);
  }
  process.exit();
};

// delete all data from DB
const deleteData = async () => {
  try {
    await Tour.deleteMany();
    console.log('data successfully deleted');
  } catch (err) {
    console.log(err);
  }
  process.exit();
};

if (process.argv[2] === '--import') {
  importData();
} else if (process.argv[2] === '--delete') {
  deleteData();
}
