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

const rawProductData = {
  data: {
    items: [
      {
        id: 'sku_123',
        attributes: {
          name: 'Ultra HD TV',
          price: { amount: 799.99, currency: 'USD' },
          tags: ['electronics', 'tv'],
          available: true,
          dimensions: {
            width: 55,
            height: 35,
            depth: 4,
          },
        },
        meta: {
          createdAt: '2023-12-01T10:30:00Z',
          updatedAt: '2024-03-02T14:12:00Z',
        },
      },
      // more products...
    ],
  },
};

interface Price {
  amount: number; //decimal?
  currency: string;
}

interface Dimensions {
  width: number;
  height: number;
  depth: number;
}

interface Attributes {
  name: string;
  price: Price;
  tags: string[];
  available: boolean;
  dimensions: Dimensions;
}

interface Product {
  id: string;
  name: string;
  price: number;
  currency: string;
  tags: string[];
  available: boolean;
  dimensions: Dimensions;
  createdAt: string;
  updatedAt: string;
}

const rawOrderData = {
  orders: [
    {
      orderId: 'order_001',
      customer: {
        id: 'cust_123',
        name: 'Jane Doe',
        contact: {
          email: 'jane.doe@example.com',
          phone: '+1-555-1234',
        },
      },
      items: [
        {
          productId: 'prod_100',
          name: 'Wireless Mouse',
          quantity: 2,
          price: {
            amount: 25.5,
            currency: 'USD',
          },
        },
        {
          productId: 'prod_101',
          name: 'Mechanical Keyboard',
          quantity: 1,
          price: {
            amount: 89.99,
            currency: 'USD',
          },
        },
      ],
      status: 'shipped',
      shipping: {
        address: {
          street: '123 Main St',
          city: 'San Francisco',
          zip: '94107',
          country: 'USA',
        },
        estimatedDelivery: '2024-08-20',
      },
    },
    // more orders...
  ],
};

interface Address {
  street: string;
  city: string;
  zip: string;
  country: string;
}

interface Items {
  productId: string;
  name: string;
  quantity: number;
  amount: number;
  currency: string;
}

interface Orders {
  orderId: string;
  customerId: string;
  name: string;
  email: string;
  phone: string;
  items: Items[];
  status: string;
  address: Address;
  estimatedDelivery: string;
}
