import express from 'express';

import {
  // eslint-disable-next-line import/named
  login, checkAuth, logOut, registerUser,
} from '../controllers/authController';

const router = express.Router();

// Signup Route
router.route('/signup')
  .post(registerUser);

// Login Route
router.route('/login')
  .post(login);

// Check logged before
router.route('/init')
  .post(checkAuth);

// logout user
router.route('/logout')
  .post(checkAuth, logOut);

module.exports = router;
