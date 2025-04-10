'use client';

import { useFavorites } from '@/app/lib/favoriteContext';
import { mockRecipes } from '@/app/lib/api'; //TODO: Change to 'searchRecipes' api call
import Image from 'next/image';
import QuickBadge from '../components/quickBadge';
import { useRouter } from 'next/navigation';

export default function FavoritesPage() {
  const { favorites, removeFavorite, isFavorite } = useFavorites();

  //routing to home page
  const router = useRouter();

  const goToHome = () => {
    router.push('/');
  };

  const favoriteRecipes = mockRecipes.hits
    .map(hit => hit.recipe)
    .filter(recipe => favorites.includes(recipe.uri));

  return (
    <main className='max-w-5xl mx-auto p-4'>
      <h1 className='text-3xl font-bold mb-6 text-center'>
        💖 My Favorite Recipes
      </h1>
      <button
        onClick={goToHome}
        className='text-sm text-blue-600 hover:underline hover:text-blue-800 cursor-pointer float-right'
      >
        🏠 Back Home
      </button>

      {favoriteRecipes.length === 0 ? (
        <p className='text-center text-gray-500'>
          No favorites yet. Go find something delicious! 🍲
        </p>
      ) : (
        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6'>
          {favoriteRecipes.map(recipe => (
            <div
              key={recipe.uri}
              className='relative border rounded shadow bg-white'
            >
              <button
                onClick={() => removeFavorite(recipe.uri)}
                className='absolute top-2 right-2 text-2xl transition-transform duration-150 ease-in-out hover:scale-110 hover:text-red-500'
                title='Remove from favorites'
              >
                💔
              </button>

              <div className='p-4'>
                {/* <Image
                  src={recipe.image}
                  alt={recipe.label}
                  width={400}
                  height={300}
                  className='rounded mb-4 object-cover'
                /> */}
                <div className='bg-white text-black rounded shadow p-4'>
                  <h2 className='font-semibold text-lg mb-2'>{recipe.label}</h2>

                  {recipe.healthLabels?.length > 0 && (
                    <div className='flex flex-wrap gap-1 mb-2'>
                      {recipe.healthLabels.map(label => (
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
      )}
    </main>
  );
}
