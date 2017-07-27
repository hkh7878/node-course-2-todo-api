const {ObjectID} = require('mongodb');
const {mongoose} = require('./../server/db/mongoose');
const {Todo} = require('./../server/models/todo');
const {User} = require('./../server/models/user');

// Todo.remove({}).then((result) => {
//   console.log(result);
// });

// Todo.findOneAndRemove().then((result) => {
//
// });

Todo.findOneAndRemove({_id: '5979d46fe2ac5cf0e5288133'}).then((todo) => {

});

Todo.findByIdAndRemove('5979d46fe2ac5cf0e5288133').then((todo) => {
  console.log(todo);
});
