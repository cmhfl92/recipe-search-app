'use client';

import { useTheme } from '../lib/themeContext';

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className='p-2 rounded bg-gray-200 dark:bg-gray-700 text-black dark:text-white'
    >
      Switch to {theme === 'light' ? 'Dark' : 'Light'}
    </button>
  );
}
