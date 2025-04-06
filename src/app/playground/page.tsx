'use client';
import { useState, useEffect } from 'react';

//Shows a number starting at 10 - check
//✅ When the user clicks "Start Countdown", it counts down to 0 every second
//✅ When it reaches 0, stop the interval and show "⏰ Time’s up!"

//BONUS:
//Add a "Reset" button to bring it back to 10
//Disable the "Start Countdown" button once it’s running

export default function NoReturnBug() {
  const [count, setCount] = useState<number>(10);

  function handleIncrement() {
    setCount(prev => prev + 1);
  }

  return (
    <div className='p-6'>
      <h2 className='text-xl font-bold mb-4'>🧮 Basic Counter</h2>
      <p className='text-2xl mb-2'>Count: {count}</p>
      <button
        onClick={handleIncrement}
        className='bg-blue-600 text-white px-4 py-2 rounded'
      >
        Increment
      </button>
    </div>
  );
}
