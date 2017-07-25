const {MongoClient, ObjectID} = require('mongodb');

var obj = new ObjectID();
console.log(obj);

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, db) => {
  if (err) {
    return console.log('Unable to connect to MongoDB server');
  }
  //
  // db.collection('Todos').findOneAndUpdate({
  //   _id: new ObjectID('5976d48126b1a36e3cd853a0')
  // }, {
  //   $set: {
  //     completed: true
  //   }
  // }, {
  //   returnOriginal: false
  // }).then((result) => {
  //   console.log(result);
  // });


    db.collection('Users').findOneAndUpdate({
      _id: 123
    }, {
      $set: {
        name: 'Andrew'
      },
      $inc: {
        age: 1
      }
    }, {
      returnOriginal: false
    }).then((result) => {
      console.log(result);
    });

  console.log('Connected to MongoDB server');

  // db.close(); 123
});
