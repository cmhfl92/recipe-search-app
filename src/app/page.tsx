'use client';

import { useState } from 'react';
import { searchRecipes } from '@/app/lib/api';
import Image from 'next/image';
import QuickBadge from './components/quickBadge';
import { useFavorites } from './lib/favoriteContext';
import { useRouter } from 'next/navigation';
import ThemeToggle from './components/themeToggle';
import { useTheme } from './lib/themeContext';
import { RecipeBadge } from './components/recipeDifficultyBadge';
import { SpiceLevelBadge } from './components/spiceBadge';
import { GenericBadge } from './components/genericBadge';
import PlayGround from '@/app/playground/page';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from './store';
import { fetchRecipes } from '@/app/components/recipeSlice';
import {
  useGetReipcesQuery,
  useLazyGetReipcesQuery,
} from './components/appSlice';

export default function Homepage() {
  // const dispatch = useDispatch<AppDispatch>();
  // const {
  //   data: recipes,
  //   loading,
  //   error,
  // } = useSelector((state: RootState) => state.recipes);
  const [query, setQuery] = useState<string>('');

  // const {
  //   data: recipes = [],
  //   error,
  //   isLoading,
  // } = useGetReipcesQuery(query, {
  //   skip: !query, //search the recipe first then display list of recipes
  // });

  const [trigger, { data: recipes = [], isLoading, error }] =
    useLazyGetReipcesQuery();

  const { addFavorite, removeFavorite, isFavorite } = useFavorites();
  const { theme } = useTheme();

  //routing to favorites page
  const router = useRouter();

  const goToFavorites = () => {
    router.push('/favorites');
  };

  const goToPlayground = () => {
    router.push('/playground');
  };

  const handleSearch = async () => {
    if (!query) return;
    trigger(query);
  };

  return (
    <main
      className={`min-h-screen ${
        theme === 'dark' ? 'bg-gray-900 text-white' : 'bg-white text-black'
      }`}
    >
      <h1 className='text-3xl font-bold mb-6 text-center'>🍽️ Recipe Finder</h1>

      <div className='flex gap-2 mb-6 justify-center'>
        <input
          type='text'
          placeholder='Search for recipes (e.g. chicken)'
          value={query}
          onChange={e => setQuery(e.target.value)}
          className='border px-4 py-2 w-full max-w-md rounded shadow'
        />
        <button
          onClick={handleSearch}
          className='bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700'
        >
          Search
        </button>
        <button
          onClick={goToFavorites}
          className='text-sm text-blue-600 hover:underline hover:text-blue-800 cursor-pointer float-right'
        >
          💖 View Favorites
        </button>

        <button
          onClick={goToPlayground}
          className='text-sm text-blue-600 hover:underline hover:text-blue-800 cursor-pointer float-right'
        >
          Let's Play!
        </button>
      </div>

      {isLoading && <p className='text-center text-gray-600'>Loading...</p>}
      {error ? (
        <p className='text-center text-red-500'>
          {(error as any)?.message || 'Something went wrong.'}
        </p>
      ) : null}

      <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6'>
        {recipes.map(recipe => (
          <div
            key={recipe.uri}
            className='relative border border-slate-200 rounded shadow bg-white dark:bg-gray-800'
          >
            <button
              onClick={() =>
                isFavorite(recipe.uri)
                  ? removeFavorite(recipe.uri)
                  : addFavorite(recipe.uri)
              }
              className='absolute top-2 right-2 text-2xl transition-transform duration-150 ease-in-out hover:scale-110 active:scale-70 hover:text-red-500'
              title={
                isFavorite(recipe.uri)
                  ? 'Remove from favorites'
                  : 'Add to favorites'
              }
            >
              {isFavorite(recipe.uri) ? '❤️' : '💔'}
            </button>
            <div className='p-4'>
              {/* <Image
                src={recipe.image}
                alt={recipe.label}
                width={400}
                height={300}
                className='rounded mb-4 object-cover'
              /> */}
              <div className='bg-white text-black dark:bg-gray-800 dark:text-white rounded shadow p-4'>
                <h2 className='font-semibold text-lg mb-2'>{recipe.label}</h2>
                {recipe.healthLabels?.length! > 0 && (
                  <div className='flex flex-wrap gap-1 mb-2'>
                    {recipe.healthLabels?.map((label: string) => (
                      <span
                        key={label}
                        className='bg-blue-100 text-blue-800 text-xs font-semibold px-2.5 py-0.5 rounded'
                      >
                        {label}
                      </span>
                    ))}
                  </div>
                )}
                <p className='text-sm mb-2'>
                  ⏱️ {recipe.totalTime || 'N/A'} min{' '}
                  <QuickBadge time={recipe.totalTime} />
                </p>
                <p className='text-sm mb-2'>
                  {/* <RecipeDifficultyBadge difficulty={recipe.difficulty} /> */}
                  <GenericBadge type={recipe.difficulty} map={RecipeBadge} />
                </p>
                <p className='text-sm mb-2'>
                  {/* <SpiceBadge spiceLevel={recipe.spice} /> */}
                  <GenericBadge type={recipe.spice} map={SpiceLevelBadge} />
                </p>

                <a
                  href={recipe.url}
                  target='_blank'
                  rel='noopener noreferrer'
                  className='text-blue-600 hover:underline text-sm'
                >
                  View Full Recipe →
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}
