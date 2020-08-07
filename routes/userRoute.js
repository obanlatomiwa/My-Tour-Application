const express = require('express');

// route handlers for users
const userController = require('../controllers/userController');
const authController = require('../controllers/authController');

// users routes
const router = express.Router();

// authetication route
router.post('/signup', authController.signup);
router.post('/login', authController.login);
router.post('/forgotPassword', authController.forgotPassword);
router.patch('/resetPassword/:token', authController.resetPassword);
router.patch(
  '/updateMyPassword',
  authController.protectRoute,
  authController.updatePassword
);
router.patch('/updateMe', authController.protectRoute, userController.updateMe);
router.delete(
  '/deleteMe',
  authController.protectRoute,
  userController.deleteMe
);

// other routes
router.route('/').get(userController.getUsers).post(userController.postUser);
router
  .route('/:id')
  .get(userController.getUser)
  .patch(userController.patchUser)
  .delete(userController.deleteUser);

module.exports = router;
