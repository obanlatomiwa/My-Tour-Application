const fs = require('fs');

// loading data
const tours = JSON.parse(fs.readFileSync(`${__dirname}/../dev-data/data/tours-simple.json`, 'utf8'));

// route handlers for tours
exports.getTours = (req, res) => {
  res.status(200).json({
    status: 'success',
    results: tours.length,
    data: {
      tours,
    },
  });
};

exports.getTour = (req, res) => {
  // get id from url
  // a trick to convert string to integer
  id = req.params.id * 1;
  const tour = tours.find((el) => el.id === id);

  if (!tour) {
    res.status(404).json({ status: 'failed', message: 'invalid id' });
  }

  res.status(200).json({
    status: 'success',
    data: {
      tour,
    },
  });
};

exports.postTour = (req, res) => {
  // get id from url
  // a trick to convert string to integer
  id = req.params.id * 1;
  const tour = tours.find((el) => el.id === id);

  if (!tour) {
    res.status(404).json({ status: 'failed', message: 'invalid id' });
  }

  res.status(200).json({
    status: 'success',
    data: {
      tour,
    },
  });
};

exports.patchTour = (req, res) => {
  // get id from url
  // a trick to convert string to integer

  if (req.params.id * 1 > tours.length) {
    res.status(404).json({ status: 'failed', message: 'invalid id' });
  }

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
  if (req.params.id * 1 > tours.length) {
    res.status(404).json({ status: 'failed', message: 'invalid id' });
  }

  res.status(204).json({
    status: 'success',
    data: null,
  });
};
