'use client';
import { useState } from 'react';

export default function ScoreTracker() {
  const [score, setScore] = useState(0);
  const [log, setLog] = useState<string[]>([]);

  function handleAddPoint() {
    const nextScore = score + 1;
    setScore(nextScore);
    setLog([...log, `You scored! Total: ${nextScore}`]);
  }

  return (
    <div className='p-6'>
      <h2 className='text-xl font-bold mb-4'>🏆 Score Tracker</h2>
      <p className='mb-4'>Current Score: {score}</p>
      <button
        className='bg-green-600 text-white px-4 py-2 rounded'
        onClick={handleAddPoint}
      >
        +1 Point
      </button>

      <ul className='mt-4'>
        {log.map((entry, i) => (
          <li key={i}>{entry}</li>
        ))}
      </ul>
    </div>
  );
}
