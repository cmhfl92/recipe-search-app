const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

mongoose.connect('mongodb://localhost:27017/recipesdb');

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB!');
});

const Recipe = mongoose.model('Recipe', {
  label: String,
});

app.get('/', (req, res) => {
  res.send('Welcome to the Recipe API!');
});

app.get('/recipes', async (req, res) => {
  try {
    const recipes = await Recipe.find();
    res.json(recipes);
  } catch (err) {
    console.error('Error fetching recipes:', err);
    res.status(500).json({ error: 'Failed to fetch recipes' });
  }
});

app.post('/recipes', async (req, res) => {
  try {
    const { label } = req.body;

    if (!label) {
      return res.status(400).json({ error: 'Label is required!' });
    }

    const newRecipe = new Recipe({ label });
    const savedRecipe = await newRecipe.save();

    res.status(201).json(savedRecipe);
  } catch (err) {
    console.error('Error saving recipe:', err);
    res.status(500).json({ error: 'Something went wrong' });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
