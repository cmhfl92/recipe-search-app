'use client';
import { useState, useEffect } from 'react';
import Button from '../components/Button';
import { recipesApi } from '../components/appSlice';

//SECTION 1
type UserType = {
  name: string;
  age: number;
};

interface UserInterface {
  name: string;
  age: number;
}

type AdminType = UserType & { role: string };
interface AdminInterface extends UserInterface {
  role?: string;
}

//SECTION 2
function isString(input: unknown): input is string {
  return typeof input === 'string';
}

function printLength(value: unknown) {
  if (isString(value)) {
    console.log('Length:', value.length);
  } else {
    console.log('Not a string');
  }
}

//Base Recipe
interface BaseRecipe {
  title: string;
  ingredients: string[];
  totalTime: number;
}

interface ExtendedRecipe extends BaseRecipe {
  difficulty: DifficultyLevel2;
  spiceLevel?: SpiceLevel2;
  variants?: RecipeVariant[];
  ratings: Rating;
  isFavorite: boolean;
}

type RecipeVariant = 'Vegetarian' | 'Gluten Free' | 'Vegan';

enum SpiceLevel2 {
  NoSpice = 'noSpice',
  Mild = 'mild',
  Hot = 'hot',
}

enum DifficultyLevel2 {
  Easy = 'easy',
  Medium = 'medium',
  Hard = 'hard',
}

enum Rating {
  One = 1,
  Two = 2,
  Three = 3,
  Four = 4,
  Five = 5,
}

const dalRecipe: ExtendedRecipe = {
  title: 'Moong Dal',
  ingredients: ['garam masala', 'onions', 'garlic', 'ginger'],
  totalTime: 45,
  difficulty: DifficultyLevel2.Hard,
  spiceLevel: SpiceLevel2.Hot,
  variants: ['Vegan', 'Gluten Free'],
  isFavorite: true,
  ratings: Rating.Five,
};

const chickenRecipe: ExtendedRecipe = {
  title: 'Chicken Thighs',
  ingredients: [
    'chicken thighs',
    'garlic powder',
    'onion powder',
    'salt',
    'pepper',
  ],
  totalTime: 30,
  difficulty: DifficultyLevel2.Easy,
  spiceLevel: SpiceLevel2.NoSpice,
  variants: ['Gluten Free'],
  isFavorite: false,
  ratings: Rating.Three,
};

function filterTopRatedFavorites(recipe: ExtendedRecipe[]) {
  return recipe.filter(rate => rate.ratings >= 4 && rate.isFavorite);
}

const topRecipes = filterTopRatedFavorites([chickenRecipe, dalRecipe]);

console.log(topRecipes);

//SECTION 3
const Playground = () => {
  const [count, setCount] = useState(0);

  return (
    <>
      <h1 className='text-xl font-bold mb-4'>🧪 TypeScript Playground</h1>
      <p className='mb-4'>You’ve clicked the button {count} times.</p>
      <div className='flex gap-4'>
        <Button onClick={() => setCount(prev => prev + 1)} label='Click me!' />
        <Button label='Reset' variant='secondary' onClick={() => setCount(0)} />
      </div>
    </>
  );
};

// export default Playground;

('use client'); //nextjs

// import React, { useState } from 'react';

const secret_word = 'hangman';

const max_wrong_guesses = 6;

const Hangman = () => {
  const [guesses, setGuesses] = useState<string[]>([]);

  const wrongGuesses = guesses.filter(letter => !secret_word.includes(letter));

  const isLoser = wrongGuesses.length >= max_wrong_guesses;
  const isWinner = secret_word
    .split('')
    .every(letter => guesses.includes(letter));

  //figure out the guesses and return condition if there's already a letter inclluded or a loser/winner
  const handleGuess = (letter: string) => {
    if (guesses.includes(letter) || isLoser || isWinner) return;
    setGuesses(prev => [...prev, letter]);
  };

  //getting the secret word and splitting, mapping through the letter to see if we find the one included in our guess then display it or else display - and then join them to show the word.
  const getDisplayWord = () => {
    return secret_word
      .split('')
      .map(letter => (guesses.includes(letter) ? letter : '_'))
      .join(' ');
  };
};

export default Hangman;
