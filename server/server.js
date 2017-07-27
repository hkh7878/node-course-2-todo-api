// 모듈
var express = require('express');
var bodyParser = require('body-parser');
var {ObjectID} = require('mongodb');

// custom 모듈
var {mongoose} = require('./db/mongoose');
var {Todo} = require('./models/todo');
var {User} = require('./models/user');

var app = express();

// 미들웨어
app.use(bodyParser.json());

// 라우팅
app.post('/todos', (req, res) => {
  var todo = new Todo({
    text: req.body.text
  });

  todo.save().then((doc) => {
    res.status(200).send(doc);
  }, (err) => {
    res.status(400).send(err);
  });
});

app.get('/todos', (req, res) => {
  Todo.find().then((todos) => {
    res.send({
      todos
    });
  }, (e) => {
    res.status(400).send(e);
  });
});

// GET /todos/12345...
app.get('/todos/:id', (req, res) => {
  var id = req.params.id;

  if (!ObjectID.isValid(id)) {
    return res.status(404).send();
  }

  Todo.findById(id).then((todo) => {
    if (!todo) {
      return res.status(404).send();
    }
    res.send({todo: todo});
  }, (e) => {
    res.status(404).send();
  });
});

// 서버시작
app.listen(3000, () => {
  console.log('Started on port 3000');
});

module.exports = {app};
