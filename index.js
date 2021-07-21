const mongoose = require('mongoose');

mongoose.set('useFindAndModify', false);
// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require('./models/Recipe.model');
// Import of the data from './data.json'
const data = require('./data');

const MONGODB_URI = 'mongodb://localhost:27017/recipe-app';

// Connection to the database "recipe-app"
mongoose
  .connect(MONGODB_URI, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(self => {
    console.log(`Connected to the database: "${self.connection.name}"`);
    // Before adding any recipes to the database, let's remove all existing ones
    return Recipe.deleteMany()
  })
  .then(() => {
    //Iteration 1
    // Recipe.create(data[0]).then((newDoc) => {
    //   console.log(newDoc.title)
    // }).catch(e => console.log(e))

    // Iteration 2
    Recipe.insertMany(data).then((newDocuments => {
      newDocuments.forEach(recipe => console.log(recipe.title))
      Recipe.findOneAndUpdate({title: 'Rigatoni alla Genovese'}, {duration: 100})
      .then((v) => {
        console.log('=================UPDATE===================')
        console.log(`"${v.title}" was succesfully updated.`)
      })
      .catch(e => console.log(e))

      Recipe.deleteOne({title: 'Carrot Cake'})
      .then(value => {
        console.log('=================DELETE===================')
        console.log(`item was succesfully deleted`)

        mongoose.connection.close(() => {
          console.log('Closed the connection')
        })
      })
      .catch(e => console.log(e))

    })).catch(e => console.log(e))

  })
  .catch(error => {
    console.error('Error connecting to the database', error);
  });