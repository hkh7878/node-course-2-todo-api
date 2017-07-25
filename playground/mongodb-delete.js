const {MongoClient, ObjectID} = require('mongodb');

var obj = new ObjectID();
console.log(obj);

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, db) => {
  if (err) {
    return console.log('Unable to connect to MongoDB server');
  }

  // deleteMany
  // db.collection('Todos').deleteMany({text: 'Eat lunch'}).then((result) => {
  //   console.log(result);
  // }, (err) => {
  //
  // });

  // deleteOne
  // db.collection('Todos').deleteOne({text: 'Eat lunch'}).then((result) => {
  //   console.log(JSON.stringify(result));
  // });

  // findOneAndDelete
  // db.collection('Todos').findOneAndDelete({completed: false}).then((result) => {
  //   console.log(result);
  // });

  db.collection('Users').deleteMany({name: 'Andrew'});

  db.collection('Users').findOneAndDelete({_id: new ObjectID('5976ce256db0012160c7cb85')}).then((result) => {
    console.log(JSON.stringify(result, undefined, 2));
  }, (err) => {

  });

  console.log('Connected to MongoDB server');

  // db.close();
});
