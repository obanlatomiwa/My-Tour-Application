const express = require('express');
const reviewController = require('../controllers/reviewController');
const authController = require('../controllers/authController');

// tours routes
const router = express.Router();

router
  .route('/')
  .get(reviewController.getReviews)
  .post(
    authController.protectRoute,
    authController.restrictTo('user'),
    reviewController.createReview
  );

// router
//   .route('/:id')
//   .get(authController.protectRoute, reviewController.getReview)
//   .patch(authController.protectRoute, reviewController.updateReview)
//   .delete(authController.protectRoute, reviewController.deleteReview);

module.exports = router;


