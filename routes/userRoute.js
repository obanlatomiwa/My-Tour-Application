const express = require('express');

// route handlers for users
const userController = require('../controllers/userController');
const authController = require('../controllers/authController');

// users routes
const router = express.Router();

// authetication route
router.post('/signup', authController.signup);
router.post('/login', authController.login);
router.get('/logout', authController.logout);
router.post('/forgotPassword', authController.forgotPassword);
router.patch('/resetPassword/:token', authController.resetPassword);

// protect all route after this middleware
router.use(authController.protectRoute);

router.patch('/updateMyPassword', authController.updatePassword);
router.get('/me', userController.getMe, userController.getUser);
router.patch('/updateMe', userController.updateMe);
router.delete('/deleteMe', userController.deleteMe);

// only admins can get access to this route
router.use(authController.restrictTo('admin'));

// other routes
router.route('/').get(userController.getUsers).post(userController.postUser);
router
  .route('/:id')
  .get(userController.getUser)
  .patch(userController.patchUser)
  .delete(userController.deleteUser);

module.exports = router;
