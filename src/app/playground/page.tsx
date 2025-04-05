'use client';
import { useState } from 'react';

type Message = {
  id: number;
  text: string;
  read: boolean;
};

export default function PlayGround() {
  const [messages, setMessages] = useState<Message[]>([
    { id: 1, text: 'Welcome!', read: false },
    { id: 2, text: 'Check your inbox.', read: false },
  ]); //original array of objects

  const [unreadCount, setUnreadCount] = useState(messages.length); //calculating how many unread messages there are.

  function toggleRead(id: number) {
    const updated = messages.map(m =>
      m.id === id ? { ...m, read: !m.read } : m
    ); //setting a toggle specifically on property "read" within the object.
    setMessages(updated); //setting that updated state in messages.

    // ❌ Stale state bug here!
    const newUnread = updated.filter(m => !m.read).length; //filtering how many unread messages there are
    setUnreadCount(newUnread); //getting the number from the newUnread variable.
  }

  return (
    <div className='p-6'>
      <h2 className='text-xl font-bold mb-4'>📩 Message Center</h2>
      <p>Unread Messages: {unreadCount}</p>
      <ul>
        {messages.map(m => (
          <li key={m.id}>
            {m.text} —{' '}
            <button
              onClick={() => toggleRead(m.id)}
              className='text-blue-600 underline'
            >
              Mark as {m.read ? 'Unread' : 'Read'}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
