// Requiring Modules
const express = require('express');
const config = require('config');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const mongoose = require('mongoose');

// Requiring project files
const notesRoute = require('./routes/notesRoute');

// load configurations
const port = config.get('app.port');
const db = config.get('database.url');
const prefix = config.get('api.prefix');
const app = express();
const corsOptions = {
  origin: config.get('client.url'),
  credentials: true,
};

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
// apply to all requests
app.use(apiLimiter);

// Setup mongoose connection
mongoose.Promise = global.Promise;
mongoose.connect(db, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).catch((err) => console.log({ error: err }));

// Calling api routes
app.use(prefix, notesRoute);

// Running server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
