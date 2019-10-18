// Dummy Data
//var data = [{item: 'get milk'},{item: 'Walk dog'},{item: 'Kick some coding ass'}];

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
// var itemOne = Todo({item: 'Get some sleep'}).save(function(err){
//   if(err) throw err;
//   console.log('Item Saved!!');
// });

module.exports = function (app) {

  app.get('/todo',function(req, res){
      // Get data from mongodb
      Todo.find({}, function(err, data){ // retrive all items
        if(err) throw err;
        res.render('todo',{todos:data});
      });
  });

  app.post('/todo', urlencodedParser,function(req, res){
    // Get item from input and add it to database
    var itemOne = Todo(req.body).save(function(err, data){
      if(err) throw err;
      res.status(200).send(data);
    });
  });

  app.put('/todo',function(req, res){

  });

  app.delete('/todo/:item',function(req, res){
    // Delete item from mongodb 
    Todo.find({item: req.params.item.replace(/\-/g," ")}).deleteOne(function(err, data){
      if (err) throw err;
      res.status(200).send(data);
    });
  });

};
