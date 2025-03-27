'use client';

import { useState } from 'react';
import { searchRecipes } from '@/app/lib/api';
import Image from 'next/image';
import QuickBadge from './components/quickBadge';
import { useFavorites } from './lib/favoriteContext';
import { useRouter } from 'next/navigation';
import ThemeToggle from './components/themeToggle';

export default function Homepage() {
  const { addFavorite, removeFavorite, isFavorite } = useFavorites();

  //routing to favorites page
  const router = useRouter();

  const goToFavorites = () => {
    router.push('/favorites');
  };

  const [query, setQuery] = useState<string>('');
  const [recipes, setRecipes] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');

  console.log('App ID:', process.env.NEXT_PUBLIC_EDAMAM_APP_ID);
  console.log('App Key:', process.env.NEXT_PUBLIC_EDAMAM_APP_KEY);

  const handleSearch = async () => {
    if (!query) return;
    setLoading(true);
    setError('');
    try {
      const data = await searchRecipes(query);
      if (!data?.hits) {
        setError('No recipes found.');
        setRecipes([]);
        return;
      }
      console.log('data', data);
      setRecipes(data.hits.map((hit: any) => hit.recipe));
    } catch (err) {
      console.error(err);
      setError('Failed to fetch recipes. Try again!');
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className='bg-white text-black dark:bg-gray-900 dark:text-white min-h-screen'>
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
        <ThemeToggle />
      </div>

      {loading && <p className='text-center text-gray-600'>Loading...</p>}
      {error && <p className='text-center text-red-500'>{error}</p>}

      <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6'>
        {recipes.map(recipe => (
          <div
            key={recipe.uri}
            className='relative border rounded shadow bg-white'
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
              <Image
                src={recipe.image}
                alt={recipe.label}
                width={400}
                height={300}
                className='rounded mb-4 object-cover'
              />
              <div className='bg-white text-black rounded shadow p-4'>
                <h2 className='font-semibold text-lg mb-2'>{recipe.label}</h2>
                {recipe.healthLabels?.length > 0 && (
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
