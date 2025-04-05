'use client';
import { useState } from 'react';

// This component displays random facts. User can add new ones, mark favorites, and sort them.

type Fact = {
  id: number;
  text: string;
  favorite: boolean;
};

//Bugs to fix:
//A logic bug with adding new facts - fixed
//An issue with mutating state
//A common sorting trap - fixed
//A key problem
//A subtle issue with IDs
//One hoisting / scope mistake

export default function RandomFacts() {
  const [facts, setFacts] = useState<Fact[]>([
    { id: 1, text: 'Bananas are berries!', favorite: false },
    { id: 2, text: 'Sharks are older than trees.', favorite: false },
    { id: 3, text: 'Octopuses have three hearts.', favorite: true },
  ]);

  const [newFact, setNewFact] = useState('');
  //let factId = 4; //it seems liike this would be fine but I am using the date.now() method

  function handleAddFact() {
    if (newFact === '') return;

    const fact = {
      id: Date.now(),
      text: newFact,
      favorite: false,
    };

    // facts.push(fact); don't want to mutate the array directly by pushing
    // setFacts(facts); // fixed with spread operator and setting the new fact object within the array.
    setFacts([...facts, fact]);
    setNewFact('');
  }

  function toggleFavorite(factId: number) {
    const updatedFacts = facts.map(f =>
      f.id === factId
        ? {
            ...f,
            favorite: !f.favorite,
          }
        : f
    );
    console.log('facts', facts);
    setFacts(updatedFacts);
  }

  function sortFacts() {
    const sorted = facts.toSorted((a, b) => a.text.localeCompare(b.text)); //I know I can use spread but I rather use updated es language
    setFacts(sorted);
  }

  return (
    <div className='p-6'>
      <h2 className='text-2xl font-bold mb-4'>🧠 Fun Fact Machine</h2>

      <input
        className='border p-2 mr-2'
        type='text'
        value={newFact}
        onChange={e => setNewFact(e.target.value)}
        placeholder='Add a new fact'
      />
      <button
        onClick={handleAddFact}
        className='bg-green-500 text-white px-4 py-2 rounded'
      >
        Add Fact
      </button>

      <button
        onClick={sortFacts}
        className='ml-2 bg-blue-500 text-white px-4 py-2 rounded'
      >
        Sort Facts
      </button>

      <ul className='mt-6'>
        {facts.map(fact => (
          <li key={fact.id} className='mb-2'>
            <span>{fact.text}</span>
            <button
              onClick={() => toggleFavorite(fact.id)}
              className='ml-4 text-sm text-purple-600 hover:underline'
            >
              {fact.favorite ? '★ Favorite' : '☆ Unfavorite'}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
