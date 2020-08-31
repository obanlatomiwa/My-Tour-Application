const express = require('express');
const bookingController = require('../controllers/bookingController');
const authController = require('../controllers/authController');

// tours routes
const router = express.Router();

router.get(
  '/checkout-session/:tourId',
  authController.protectRoute,
  bookingController.getCheckoutSession
);
module.exports = router;
 