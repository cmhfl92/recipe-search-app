'use client';
import { useState } from 'react';

export default function DelayedScoreTracker() {
  const [score, setScore] = useState(0);
  const [log, setLog] = useState<string[]>([]);

  // function handleAddScore() {
  //   setTimeout(() => {
  //     setScore(prevScore => {
  //       const newScore = prevScore + 1;
  //       setLog(prevLog => [
  //         ...prevLog,
  //         `Scored after delay! Total: ${newScore}`,
  //       ]);
  //       return newScore;
  //     });
  //   }, 1000);
  // }

  function handleAddScore() {
    setTimeout(() => {
      console.log('Timer fired!');

      setScore(prevScore => {
        const newScore = prevScore + 1;
        setLog(prevLog => [
          ...prevLog,
          `Scored after delay! Total: ${newScore}`,
        ]);

        return newScore;
      });
    }, 1000);
  }

  return (
    <div className='p-6'>
      <h2 className='text-xl font-bold mb-4'>🏁 Delayed Score Tracker</h2>
      <p>Score: {score}</p>
      <button
        onClick={handleAddScore}
        className='bg-green-600 text-white px-4 py-2 rounded'
      >
        Add Score (After 1s)
      </button>

      <ul className='mt-4'>
        {log.map((entry, index) => (
          <li key={index}>{entry}</li>
        ))}
      </ul>
    </div>
  );
}
