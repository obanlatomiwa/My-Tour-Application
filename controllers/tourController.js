const Tour = require('../models/tourModel');

exports.checkBody = (req, res, next) => {
  if (!req.body.name || !req.body.price) {
    return res.status(404).json({ status: 'error', message: 'Missing name or price' });
  }
  next();
};

// route handlers for tours
exports.getTours = (req, res) => {
  res.status(200).json({
    status: 'success',
    // results: tours.length,
    // data: {
    //   tours,
    // },
  });
};

exports.getTour = (req, res) => {
  // get id from url
  // a trick to convert string to integer
  // id = req.params.id * 1;
  // const tour = tours.find((el) => el.id === id);
  // res.status(200).json({
  //   status: 'success',
  //   data: {
  //     tour,
  //   },
  // });
};

exports.postTour = (req, res) => {
  // res.status(201).json({
  //   status: 'success',
  //   data: {
  //     tour: newTour,
  //   },
  // });
};

exports.patchTour = (req, res) => {
  // get id from url
  res.status(201).json({
    status: 'success',
    data: {
      tour: 'updated tour',
    },
  });
};

exports.deleteTour = (req, res) => {
  console.log(req.params);
  // get id from url
  res.status(204).json({
    status: 'success',
    data: null,
  });
};
