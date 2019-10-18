// Dummy Data
var data = [{item: 'get milk'},{item: 'Walk dog'},{item: 'Kick some coding ass'}];

// Body Parser to handle POST requests
const bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded({ extended: false });

//Database part
const mongoose = require('mongoose');

// Connect to database
mongoose.connect('mongodb+srv://amrister:mngbfhty64@todo-xp4ta.mongodb.net/test?retryWrites=true&w=majority', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

// Create a Schema - like a blue print for our data
var todoSchema = new mongoose.Schema({
  item: String,
});

//Create Model
var Todo = mongoose.model('Todo',todoSchema);

// Add First Item
var itemOne = Todo({item: 'get milk'}).save(function(err){
  if(err) throw err;
  console.log('Item Saved!!');
});

module.exports = function (app) {

  app.get('/todo',function(req, res){
      res.render('todo',{'todos':data});
  });

  app.post('/todo', urlencodedParser,function(req, res){
    data.push(req.body);
    res.status(200).send(data);
  });

  app.put('/todo',function(req, res){

  });

  app.delete('/todo/:item',function(req, res){
    data = data.filter(function(todo){
      return todo.item.replace(/ /g,'-') !== req.params.item;
    });
    res.status(200).send(data);
  });

};
