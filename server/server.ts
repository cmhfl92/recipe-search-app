import express, { Request, Response } from 'express';
import cors from 'cors';
import mongoose, { ConnectOptions } from 'mongoose';

const app = express();
const PORT = 5000;

app.use(
  cors({
    origin: '*',
    methods: ['GET', 'POST', 'DELETE'],
    credentials: true,
  })
);
app.use(express.json());

mongoose.connect('mongodb://localhost:27017/recipesdb');

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB!');
});

interface IRecipe extends mongoose.Document {
  label: String;
}

const recipeSchema = new mongoose.Schema({
  label: { type: String, required: true },
  image: { type: String, required: true },
  difficulty: { type: String, required: true },
  spice: { type: String, required: true },
  ingredients: { type: [String], required: true },
});

const favoritesSchema = new mongoose.Schema({
  uri: { type: String, required: true },
  favoritesId: { type: Number, required: true },
  isFavorite: { type: Boolean, required: true },
});

const Favorite = mongoose.model('Favorite', favoritesSchema);

const Recipe = mongoose.model('Recipe', recipeSchema);

app.get('/', (_req: Request, res: Response) => {
  res.send('Welcome to the Recipe API!');
});

app.get('/recipes', async (_req: Request, res: Response): Promise<void> => {
  try {
    const recipes = await Recipe.find();
    console.log('recipe', recipes);

    res.json(recipes);
  } catch (err) {
    console.error('Error fetching recipes:', err);
    res.status(500).json({ error: 'Failed to fetch recipes' });
  }
});

app.get('/search', async (req: Request, res: Response): Promise<void> => {
  const query = req.query.query?.toString().toLocaleLowerCase();

  try {
    const allRecipes = await Recipe.find();

    const filtered = query
      ? allRecipes.filter(recipe => recipe.label.toLowerCase().includes(query))
      : allRecipes;

    res.json({ hits: filtered.map(recipe => ({ recipe })) });
  } catch (err) {
    res.status(500).json({ error: 'Failed to search recipes' });
  }
});

app.get('/favorites', async (_req: Request, res: Response): Promise<void> => {
  try {
    const favorites = await Favorite.find();
    console.log('favorites: server GET cal:', favorites);
    res.json(favorites);
  } catch (err) {
    console.error('Failed to GET favorites', err);
    res.status(500).json({ err: 'Failed to fetch favorites' });
  }
});

app.post('/favorites', async (req: Request, res: Response): Promise<void> => {
  try {
    const { uri, favoritesId, isFavorite } = req.body;
    if (!uri || !favoritesId || isFavorite === undefined) {
      res.status(400).json({
        error: 'Field is required!',
      });
      return;
    }
    const newFavorite = new Favorite({
      uri,
      favoritesId,
      isFavorite,
    });
    const savedFavorite = await newFavorite.save();
    console.log('saved favorites', savedFavorite);
    res.status(201).json(savedFavorite);
  } catch (err) {
    console.error('Failed to POST favorites', err);
    res.status(500).json({ err: 'Failed to POST your Favorite' });
  }
  return;
});

app.post('/recipes', async (req: Request, res: Response): Promise<void> => {
  try {
    const { label, image, difficulty, spice, ingredients } = req.body;

    if (
      !label ||
      !image ||
      !difficulty ||
      !spice ||
      !ingredients ||
      ingredients.length === 0
    ) {
      res.status(400).json({
        error: 'All fields are required, including at least one ingredient!',
      });
      return;
    }

    //go over this again!
    let ingredientsParsed = ingredients;

    if (typeof ingredients === 'string') {
      ingredientsParsed = ingredients.split(',').map(i => i.trim());
    } else if (
      Array.isArray(ingredients) &&
      ingredients.length === 1 &&
      typeof ingredients[0] === 'string' &&
      ingredients[0].includes(',')
    ) {
      ingredientsParsed = ingredients[0].split(',').map(i => i.trim());
    }

    if (!Array.isArray(ingredientsParsed) || ingredientsParsed.length === 0) {
      res.status(400).json({ error: 'At least one ingredient is required.' });
      return;
    }

    const newRecipe = new Recipe({
      label,
      image,
      difficulty,
      spice,
      ingredients: ingredientsParsed,
    });
    const savedRecipe = await newRecipe.save();

    console.log('Saved Recipe:', savedRecipe);

    res.status(201).json(savedRecipe);
  } catch (err) {
    console.error('Error saving recipe:', err);
    res.status(500).json({ error: 'Something went wrong' });
  }
});

app.delete(
  '/recipes/:id',
  async (req: Request, res: Response): Promise<void> => {
    try {
      const { id } = req.params;
      const deleted = await Recipe.findByIdAndDelete(id);

      if (!deleted) {
        res.status(404).json({ error: 'Recipe not found :(' });
        return;
      }

      res.status(200).json({ message: 'Recipe deleted successfully :)' });
    } catch (err) {
      console.error('Error deleting recipe:', err);
      res.status(500).json({ error: 'Something went wrong' });
    }
  }
);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

//working on SQL and reading Database System Concepts.
//worked on a SQL quiz and aced it - WHERE quiz.
//worked on more where clauses with round and like
