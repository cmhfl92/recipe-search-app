'use client';

import { useState } from 'react';
import Image from 'next/image';
import QuickBadge from './components/quickBadge';
import { useFavorites } from './lib/favoriteContext';
import { useRouter } from 'next/navigation';
import { useTheme } from './lib/themeContext';
import { RecipeBadge } from './components/recipeDifficultyBadge';
import { SpiceLevelBadge } from './components/spiceBadge';
import { GenericBadge } from './components/genericBadge';
import {
  useDeleteRecipeMutation,
  useLazyGetReipcesQuery,
} from './slices/appSlice';
import Button from './components/Button';
import RecipeModal from './components/modal';
import IngredientsModal from './components/ingredientsModal';
import { selectClasses } from '@mui/material';

export default function Homepage() {
  const [query, setQuery] = useState<string>('');

  const [isModalOpen, setIsModaOpen] = useState(false);

  const openModal = () => setIsModaOpen(true);
  const closeModal = () => setIsModaOpen(false);

  //view ingredients button/modal
  const [seletedRecipe, setSelectedRecipe] = useState<null | {
    label: string;
    ingredients: string[];
  }>(null);
  const openIngredientsModal = (recipe: {
    label: string;
    ingredients: string[];
  }) => setSelectedRecipe(recipe);
  const closeIngredientsModal = () => setSelectedRecipe(null);

  const [deleteRecipe] = useDeleteRecipeMutation();
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

  const handleDeleteRecipe = async (id: string) => {
    await deleteRecipe(id);
    trigger(query);
  };

  return (
    <main
      className={`min-h-screen ${
        theme === 'dark' ? 'bg-gray-900 text-white' : 'bg-[#faefdd] text-black'
      }`}
    >
      <div className='flex justify-center'>
        <Image
          src='/recipe-finder-logo.png'
          alt='Recipe Finder Logo'
          width={200}
          height={200}
        />
      </div>
      <div className='flex gap-2 mb-6 justify-center'>
        <input
          type='text'
          placeholder='Search for recipes (e.g. chicken)'
          value={query}
          onChange={e => setQuery(e.target.value)}
          className='border px-4 py-2 w-full max-w-md rounded shadow'
        />
        <Button
          label='Search'
          onClick={handleSearch}
          variant='primary'
          className=''
        />
        <Button label='Add New Recipe' onClick={openModal} variant='primary' />
        <RecipeModal onClose={closeModal} open={isModalOpen} />
        {/* <button
          onClick={goToFavorites}
          className='text-sm text-blue-600 hover:underline hover:text-blue-800 cursor-pointer float-right'
        >
          💖 View Favorites
        </button>*/}

        {/* <button
          onClick={goToPlayground}
          className='text-sm text-blue-600 hover:underline hover:text-blue-800 cursor-pointer float-right'
        >
          Let's Play!
        </button> */}
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
            key={recipe._id || recipe.uri}
            className='relative border border-slate-200 rounded shadow bg-white dark:bg-gray-800'
          >
            <button
              onClick={() =>
                isFavorite(recipe._id)
                  ? removeFavorite(recipe._id)
                  : addFavorite(recipe._id)
              }
              className='absolute top-2 right-2 text-2xl transition-transform duration-150 ease-in-out hover:scale-110 active:scale-70 hover:text-red-500'
              title={
                isFavorite(recipe._id)
                  ? 'Remove from favorites'
                  : 'Add to favorites'
              }
            >
              {isFavorite(recipe._id) ? '❤️' : '💔'}
            </button>
            {/* <Button
              onClick={() => {
                handleDeleteRecipe(recipe._id);
              }}
              className='absolute top-1 right-8 text-white bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 shadow-lg shadow-red-500/50 dark:shadow-lg dark:shadow-red-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2'
              title='Delete'
            /> */}
            <div className='w-1/6'>
              <Button
                label='Delete'
                onClick={() => {
                  handleDeleteRecipe(recipe._id);
                }}
                variant='secondary'
                className=''
              />
            </div>

            <div className='p-4'>
              <Image
                src={recipe.image!}
                alt='Pexels Image'
                width={400}
                height={300}
              />
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
                  <QuickBadge time={recipe.totalTime!} />
                </p>
                {recipe.difficulty && (
                  <p className='text-sm mb-2'>
                    {/* <RecipeDifficultyBadge difficulty={recipe.difficulty} /> */}
                    <GenericBadge type={recipe.difficulty} map={RecipeBadge} />
                  </p>
                )}
                {recipe.spice && (
                  <p className='text-sm mb-2'>
                    {/* <SpiceBadge spiceLevel={recipe.spice} /> */}
                    <GenericBadge type={recipe.spice} map={SpiceLevelBadge} />
                  </p>
                )}
                {recipe.ingredients && (
                  <>
                    <Button
                      label='View Ingredients'
                      onClick={() => openIngredientsModal(recipe)}
                      variant='primary'
                      className=''
                    />
                  </>
                )}
              </div>
            </div>
          </div>
        ))}
        <IngredientsModal
          onClose={closeIngredientsModal}
          open={!!seletedRecipe}
          label={seletedRecipe?.label}
          ingredients={seletedRecipe?.ingredients}
        />
      </div>
    </main>
  );
}
