const express = require('express');
const cors = require('cors');

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Welcome to the Recipe API!');
});

app.get('/recipes', (req, res) => {
  res.json([
    { id: 1, label: 'Mock Spaghetti' },
    { id: 2, label: 'Mock Tacos' },
  ]);
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
