const express = require('express');

// route handlers for users
const userController = require('../controllers/userController');
const authController = require('../controllers/authController');

// users routes
const router = express.Router();

// authetication [signup] route
router.post('/signup', authController.signup);

// other routes
router.route('/').get(userController.getUsers).post(userController.postUser);
router
  .route('/:id')
  .get(userController.getUser)
  .patch(userController.patchUser)
  .delete(userController.deleteUser);

module.exports = router;
