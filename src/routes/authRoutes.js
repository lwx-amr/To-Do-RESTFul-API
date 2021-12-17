import express from 'express';

import {
  // eslint-disable-next-line import/named
  login, logout, registerUser,
} from '../controllers/authController';

const router = express.Router();

// Signup Route
router.route('/user')
  .post(registerUser);

// Login Route
router.route('/token')
  .post(login);

// logout user
router.route('/token')
  .delete(logout);

module.exports = router;
