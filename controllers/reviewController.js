const Review = require('../models/reviewModel');
const APIFeatures = require('../utils/APIFeatures');
const catchAsyncError = require('../utils/catchAsyncError');
const AppError = require('../utils/appError');

exports.getReviews = catchAsyncError(async (req, res, next) => {
  // execute query
  const reviews = await Review.find();

  // send response
  res.status(200).json({
    status: 'success',
    results: reviews.length,
    data: {
      reviews,
    },
  });
});


exports.createReview = catchAsyncError(async (req, res, next) => {
  const newReview = await Review.create(req.body);

  // send response
  res.status(201).json({
    status: 'success',
    data: {
      review: newReview,
    },
  });
});

// exports.updateReview = catchAsyncError(async (req, res, next) => {
//   const review = await Review.findByIdAndUpdate(req.params.id);

//   // send response
//   res.status(200).json({
//     status: 'success',
//     data: {
//       review,
//     },
//   });
// });

// exports.deleteReview = catchAsyncError(async (req, res, next) => {
//   await Review.findByIdAndDelete(req.params.id);

//   // send response
//   res.status(200).json({
//     status: 'success',
//     data: null,
//   });
// });
