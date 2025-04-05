'use client';
import { useState } from 'react';

type Book = {
  id: number;
  title: string;
  author: string;
  read: boolean;
};

//Fix the mutation bug in handleAddBook - check
//Fix the shallow mutation in toggleReadStatus - check
//Replace index as key with something more stable - check
//(Bonus) Improve id generation to avoid duplicate IDs in real-world usage - check

export default function PlayGround() {
  const [books, setBooks] = useState<Book[]>([
    { id: 1, title: '1984', author: 'Orwell', read: false },
    { id: 2, title: 'Dune', author: 'Herbert', read: false },
  ]);

  const [newTitle, setNewTitle] = useState('');
  const [newAuthor, setNewAuthor] = useState('');

  // ❌ Bug: Books are not added properly - fixed
  function handleAddBook() {
    const newBook = {
      id: Date.now(),
      title: newTitle,
      author: newAuthor,
      read: false,
    };
    setBooks([...books, newBook]);
    setNewTitle('');
    setNewAuthor('');
  }

  // ❌ Bug: Toggling read status is broken - fixed
  function toggleReadStatus(bookId: number) {
    const readStatus = books.map(book =>
      book.id === bookId
        ? {
            ...book,
            read: !book.read,
          }
        : book
    );
    setBooks(readStatus);
  }

  return (
    <div className='p-6'>
      <h2 className='text-2xl font-bold mb-4'>📚 Book Tracker</h2>

      <input
        className='border p-2 mr-2'
        placeholder='Book title'
        value={newTitle}
        onChange={e => setNewTitle(e.target.value)}
      />
      <input
        className='border p-2 mr-2'
        placeholder='Author'
        value={newAuthor}
        onChange={e => setNewAuthor(e.target.value)}
      />
      <button
        className='bg-green-600 text-white px-4 py-2 rounded'
        onClick={handleAddBook}
      >
        Add Book
      </button>

      <ul className='mt-6'>
        {books.map(book => (
          <li key={book.id} className='mb-2'>
            <span className='mr-4'>
              <strong>{book.title}</strong> by {book.author}
            </span>
            <button
              onClick={() => toggleReadStatus(book.id)}
              className='text-blue-600 underline'
            >
              Mark as {book.read ? 'Unread' : 'Read'}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
