// Requiring Modules
const express = require('express');
const todoController = require('./controllers/todoController');

// Set up app
var app  = express();

// Set project TemplateEngine
app.set('view engine', 'ejs');

// Static files
app.use(express.static('./public'));

// Fire Controller
todoController(app);

// Listen to port
app.listen(3000);
console.log('You\'re listening to port 3000');
