// Requiring Modules
import express from 'express';
import config from 'config';
import cors from 'cors';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import mongoose from 'mongoose';
import debug from 'debug';
import bodyParser from 'body-parser';

// Requiring project files
import notesRoute from './routes/notesRoute';

// load configurations
const port = config.get('app.port');
const db = config.get('database.url');
const prefix = config.get('api.prefix');
const app = express();
const corsOptions = {
  origin: config.get('client.url'),
  credentials: true,
};

// Init loggers
const httpLogger = debug('app:http-server');
const dbLogger = debug('app:db');

// Enable body-parser
app.use(bodyParser.urlencoded({ extended: false }));

// Enable cors
app.use(cors(corsOptions));

// Using helmet to increase security
app.use(helmet());

// Using Limiter to prevent attacks
const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 min is the time of our cycle
  max: 100, // Max number of requests
  delayMs: 0, // Disable delay between each request
  // Each ip will be able to make only 100 request in each 15 min with no delay between requests
});
app.use(apiLimiter); // apply to all requests

// Setup mongoose connection
mongoose.Promise = global.Promise;
mongoose.connect(db, { useNewUrlParser: true, useUnifiedTopology: true })
  .catch((err) => dbLogger({ error: err }));

// Simple main api url response
app.get('/', (req, res) => {
  res.json({ message: 'Welcome, this is our great restful api.' });
});

// Calling api routes
app.use(prefix, notesRoute);

// Running server
app.listen(port, () => httpLogger(`Server is running on port ${port}`));
