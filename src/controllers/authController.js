import debug from 'debug';
import { verify } from 'jsonwebtoken';
import config from 'config';
import UsersModel from '../repository/usersModel';

const authLogger = debug('app:authController');

// Register user in database
const registerUser = (req, res) => {
  authLogger(req.body);
  const newUser = UsersModel(req.body);
  newUser.save()
    .then((user) => res.json({
      msg: 'User is successfully add',
      user,
    }))
    .catch((err) => {
      authLogger(err);
      res.status(400).json({
        msg: 'Bad request',
        errors: err.errors,
      });
    });
};

// Function to check login
const login = (req, res) => {
  const { email, password } = req.body;
  UsersModel.findByCredentials(email, password)
    .then((user) => ((user.token) ? user.token : user.generateAuthToken()))
    .then((token) => res.json({ token }))
    .catch((err) => {
      authLogger(err);
      res.status(400).json({
        msg: 'Bad request',
        errors: err.errors,
      });
    });
};

// Decode JWT Token
const decodeRequestToken = (req, res, token) => {
  const jwtKey = config.get('token.jwtKey');
  if (!token) { res.status(400).json({ msg: 'Unauthorized request' }); }

  return new Promise((resolve, reject) => {
    verify(token, jwtKey, (err, decoded) => {
      if (err) reject(err);
      else resolve(decoded);
    });
  });
};

// Middleware to prevent unauthorized users
const checkAuth = async (req, res, next) => {
  const token = req.headers['app-jwt'];
  decodeRequestToken(req, res, token)
    .then((decodedToken) => UsersModel.findOne({ _id: decodedToken.id, token }))
    .then((user) => {
      req.user = user;
      next();
    })
    .catch((err) => {
      authLogger(err);
      res.status(400).json({ msg: 'Unauthorized request' });
    });
};

const logout = (req, res) => {
  const token = req.headers['app-jwt'];
  decodeRequestToken(req, res, token)
    .then((decodedToken) => UsersModel.findOne({ _id: decodedToken.id, token }))
    .then((user) => {
      if (user) {
        authLogger(user);
        user.token = '';
        user.save();
      } else {
        authLogger(user);
        throw new Error('not logged in');
      }
    })
    .then(() => {
      res.json({
        msg: 'logged out',
      });
    })
    .catch((err) => {
      authLogger(err);
      res.status(400).json({
        msg: 'Bad request',
        errors: err.errors,
      });
    });
};

module.exports = {
  login, checkAuth, registerUser, logout,
};
