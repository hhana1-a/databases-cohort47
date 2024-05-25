const express = require('express');
const mongoose = require('mongoose');
const recipes = require('./data');

const app = express();
const PORT = process.env.PORT || 3000;

mongoose.connect('mongodb://localhost:27017/recipesDB', { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;

const recipeSchema = new mongoose.Schema({
  recipe_name: String,
  categories: [String],
  ingredients: [String],
  steps: [String]
});

const Recipe = mongoose.model('Recipe', recipeSchema);

Recipe.insertMany(recipes)
  .then(() => console.log('Initial data inserted successfully'))
  .catch(err => console.error('Error inserting initial data:', err));

app.post('/recipes', (req, res) => {
  const newRecipe = req.body;
  Recipe.create(newRecipe, (err, recipe) => {
    if (err) {
      console.error('Error inserting recipe:', err);
      res.status(500).send('Error inserting recipe');
    } else {
      console.log('Recipe inserted successfully:', recipe);
      res.status(201).json(recipe);
    }
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

/* 
* What made you decide when to embed information? What assumptions did you make?
    The way I embeded information was in one go. I imagined a form, and when user fills in all fields we get the data. I made assumptions that all users will insert the same type of data, and that the fields will be predifined.

* If you were given MySQL and MongoDB as choices to build the recipe's database at the beginning, which one would you choose and why?
    Because this is not a big table MongoDB can work well, however SQL gives more structured approach thus I would stick with it unless company asks do specifically do it in MongoDB.
    I like in SQL that all this data is elegantly connected with references. I see that data is structured differently. With Mongodb it is array of objects.
    I used mongoose library to simplifiy insertion of the data. */  