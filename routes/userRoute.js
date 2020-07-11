const express = require('express');

// route handlers for users
const userController = require('../controllers/userController');

// users routes
const router = express.Router();
router.route('/').get(userController.getUsers).post(userController.postUser);
router.route('/:id').get(userController.getUser).patch(userController.patchUser).delete(userController.deleteUser);

module.exports = router;
