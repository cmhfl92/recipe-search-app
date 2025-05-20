'use client';

import { useFavorites } from '@/app/lib/favoriteContext';
// import { mockRecipes } from '@/app/lib/api'; //TODO: Change to 'searchRecipes' api call
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

  // const favoriteRecipes = mockRecipes.hits
  //   .map((hit: any) => hit.recipe)
  //   .filter((recipe: any) => favorites.includes(recipe.uri));

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
    </main>
  );
}
