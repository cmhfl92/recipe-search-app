"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const mongoose_1 = __importDefault(require("mongoose"));
const app = (0, express_1.default)();
const PORT = 5000;
app.use((0, cors_1.default)());
app.use(express_1.default.json());
mongoose_1.default.connect('mongodb://localhost:27017/recipesdb');
const db = mongoose_1.default.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
    console.log('Connected to MongoDB!');
});
const recipeSchema = new mongoose_1.default.Schema({
    label: { type: String, required: true },
});
const Recipe = mongoose_1.default.model('Recipe', recipeSchema);
app.get('/', (_req, res) => {
    res.send('Welcome to the Recipe API!');
});
app.get('/recipes', (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const recipes = yield Recipe.find();
        res.json(recipes);
    }
    catch (err) {
        console.error('Error fetching recipes:', err);
        res.status(500).json({ error: 'Failed to fetch recipes' });
    }
}));
app.post('/recipes', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { label } = req.body;
        if (!label) {
            res.status(400).json({ error: 'Label is required!' });
            return;
        }
        const newRecipe = new Recipe({ label });
        const savedRecipe = yield newRecipe.save();
        res.status(201).json(savedRecipe);
    }
    catch (err) {
        console.error('Error saving recipe:', err);
        res.status(500).json({ error: 'Something went wrong' });
    }
}));
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
