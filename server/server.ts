import express, { Request, Response } from 'express';
import cors from 'cors';
import mongoose, { ConnectOptions } from 'mongoose';

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

interface IRecipe extends mongoose.Document {
  label: String;
}

const recipeSchema = new mongoose.Schema({
  label: { type: String, required: true },
});

const Recipe = mongoose.model('Recipe', recipeSchema);

app.get('/', (_req: Request, res: Response) => {
  res.send('Welcome to the Recipe API!');
});

app.get('/recipes', async (_req: Request, res: Response): Promise<void> => {
  try {
    const recipes = await Recipe.find();
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

app.post('/recipes', async (req: Request, res: Response): Promise<void> => {
  try {
    const { label } = req.body;

    if (!label) {
      res.status(400).json({ error: 'Label is required!' });
      return;
    }

    const newRecipe = new Recipe({ label });
    const savedRecipe = await newRecipe.save();

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
