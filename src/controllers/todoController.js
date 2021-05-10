// Dummy Data
// var data = [{item: 'get milk'},{item: 'Walk dog'},{item: 'Kick some coding ass'}];

// Body Parser to handle POST requests
const bodyParser = require('body-parser');

const urlencodedParser = bodyParser.urlencoded({ extended: false });

// Database part
const mongoose = require('mongoose');

// Connect to database
mongoose.connect('', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Create a Schema - like a blue print for our data
const todoSchema = new mongoose.Schema({
  item: String,
});

// Create Model
const Todo = mongoose.model('Todo', todoSchema);

// Add First Item
// var itemOne = Todo({item: 'Get some sleep'}).save(function(err){
//   if(err) throw err;
//   console.log('Item Saved!!');
// });

module.exports = function (app) {
  app.get('/todo', (req, res) => {
    // Get data from mongodb
    Todo.find({}, (err, data) => { // retrive all items
      if (err) throw err;
      res.render('todo', { todos: data });
    });
  });

  app.post('/todo', urlencodedParser, (req, res) => {
    // Get item from input and add it to database
    const itemOne = Todo(req.body).save((err, data) => {
      if (err) throw err;
      res.status(200).send(data);
    });
  });

  app.put('/todo', (req, res) => {

  });

  app.delete('/todo/:item', (req, res) => {
    // Delete item from mongodb
    Todo.find({ item: req.params.item.replace(/\-/g, ' ') }).deleteOne((err, data) => {
      if (err) throw err;
      res.status(200).send(data);
    });
  });
};
