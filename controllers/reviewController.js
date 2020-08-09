const Review = require('../models/reviewModel');
const factory = require('./handlerFactory');
// const catchAsyncError = require('../utils/catchAsyncError');

exports.setTourUserIds = (req, res, next) => {
  //  allow nested routes
  if (!req.body.tour) req.body.tour = req.params.tourId;
  if (!req.body.user) req.body.user = req.user.id;

  next();
};

exports.getReviews = factory.getAll(Review);
exports.getReview = factory.getOne(Review);
exports.createReview = factory.createOne(Review);
exports.updateReview = factory.updateOne(Review);
exports.deleteReview = factory.deleteOne(Review);
