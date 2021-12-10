import debug from 'debug';
import { verify } from 'jsonwebtoken';
import { get } from 'config';
import UsersModel from '../repository/usersModel';

const authLogger = debug('app:notes');

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
    .then((user) => { user.generateAuthToken(); })
    .then((token) => { res.cookie('app-jwt', token, cookieOptions).send({ token }); })
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
  const token = req.cookies['app-jwt'];
  if (!token) { res.redirect(200, '/login'); }
  const decodedToken = verify(token, get('token.jwtKey'));
  UsersModel.findOne({ _id: decodedToken.id, 'tokens.token': token })
    .then((user) => {
      req.token = token;
      req.user = user;
      next();
    })
    .catch((err) => {
      authLogger(err);
      res.status(400).json({
        msg: 'Unauthorized request',
        errors: err.errors,
      });
    });
};

const logOut = (req, res) => {
  const { user, token } = req;
  user.tokens = user.tokens.filter((t) => t.token !== token);
  user.save()
    .then(() => {
      res.clearCookie('app-jwt');
      res.send();
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
