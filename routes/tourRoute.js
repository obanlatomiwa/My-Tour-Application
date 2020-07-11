const express = require('express');
const tourController = require('../controllers/tourController');

// tours routes
const router = express.Router();
router.route('/').get(tourController.getTours).post(tourController.postTour);
router.route('/:id').get(tourController.getTour).patch(tourController.patchTour).delete(tourController.deleteTour);

module.exports = router;
