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
  const cookieOptions = {
    httpOnly: true,
  };
  UsersModel.findByCredentials(email, password)
    .then((user) => user.generateAuthToken())
    .then((token) => res.header('app-jwt', token, cookieOptions).json({ token }))
    .catch((err) => {
      authLogger(err);
      res.status(400).json({
        msg: 'Bad request',
        errors: err.errors,
      });
    });
};

// Middleware to prevent unauthorized users
const checkAuth = (req, res, next) => {
  const jwtKey = config.get('token.jwtKey');
  const token = req.headers['app-jwt'];
  if (!token) { res.status(400).json({ msg: 'Unauthorized request' }); }
  const decodedToken = verify(token, jwtKey, (err, decoded) => {
    if (err) res.status(400).json({ msg: 'user token is not valid' });
    return decoded;
  });
  UsersModel.findOne({ _id: decodedToken.id, token })
    .then((user) => {
      req.user = user;
      next();
    })
    .catch((err) => {
      authLogger(err);
      res.status(400).json({ msg: 'Unauthorized request' });
    });
};

const logOut = (req, res) => {
  const { user } = req;
  authLogger(user);
  user.token = '';
  user.save()
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
  login, checkAuth, registerUser, logOut,
};
