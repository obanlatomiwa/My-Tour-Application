const express = require('express');
const reviewController = require('../controllers/reviewController');
const authController = require('../controllers/authController');

// tours routes
const router = express.Router({ mergeParams: true });

// protect all routes
router.use(authController.protectRoute);

router
  .route('/')
  .get(reviewController.getReviews)
  .post(
    authController.restrictTo('user'),
    reviewController.setTourUserIds,
    reviewController.createReview
  );

router
  .route('/:id')  
  .get(reviewController.getReview)
  .patch(
    authController.restrictTo('user', 'admin'),
    reviewController.updateReview
  )
  .delete(
    authController.restrictTo('user', 'admin'),
    reviewController.deleteReview
  );
module.exports = router;
