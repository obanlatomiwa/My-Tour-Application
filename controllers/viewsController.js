const Tour = require('../models/tourModel');
const catchAsyncError = require('../utils/catchAsyncError');
const AppError = require('../utils/appError');

exports.getOverview = catchAsyncError(async (req, res) => {
  // get tour data from db
  const tours = await Tour.find();
  // build template
  // render template
  res.status(200).render('overview', {
    title: 'All Tours',
    tours,
  });
});

exports.getTour = catchAsyncError(async (req, res) => {
  // get tour details data from db
  const tour = await Tour.findOne({ slug: req.params.slug }).populate({
    path: 'reviews',
    fields: 'review, rating user',
  });
  // build template

  // render template
  res.status(200).render('tour', {
    title: tour.name,
    tour,
  });
});
