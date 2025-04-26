'use client';
import React, { useState } from 'react';

function BuggyTodoList() {
  const [todos, setTodos] = useState<string[]>([]);
  const [newTodo, setNewTodo] = useState('');

  // Bug 1: The addTodo function should update the list of todos, but it's missing functionality.
  const addTodo = () => {
    if (newTodo !== '') {
      setTodos([...todos, newTodo]);
      setNewTodo(''); // This will add newTodo, but needs to reset the input field after adding.
    }
  };

  // Bug 2: Remove button doesn't work. We should be able to remove a todo when clicked.
  const removeTodo = index => {
    const newTodos = [...todos];
    newTodos.splice(index, 1); // Bug 2: This should update the todos list but isn't triggering a re-render.
    setTodos(newTodos);
  };

  // Bug 3: The input field doesn't clear after adding a todo. It should reset after clicking 'Add'.
  const handleInputChange = e => {
    setNewTodo(e.target.value); // This works, but we need to clear input after adding the todo.
  };

  const containerStyle = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '20px',
    border: '1px solid #ddd',
    borderRadius: '10px',
    maxWidth: '400px',
    margin: 'auto',
    backgroundColor: '#f9f9f9',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
  };

  const buttonStyle = {
    margin: '10px',
    padding: '10px 20px',
    backgroundColor: '#4CAF50',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    fontSize: '16px',
  };

  const inputStyle = {
    margin: '10px',
    padding: '10px',
    fontSize: '18px',
    textAlign: 'center',
    border: '2px solid #ccc',
    borderRadius: '5px',
    width: '100%',
  };

  const todoItemStyle = {
    margin: '5px 0',
    padding: '10px',
    border: '1px solid #ddd',
    borderRadius: '5px',
    width: '100%',
    display: 'flex',
    justifyContent: 'space-between',
    backgroundColor: '#e8f5e9',
  };

  return (
    <div style={containerStyle}>
      <h1>Buggy Todo List</h1>
      <input
        type='text'
        value={newTodo}
        onChange={handleInputChange}
        placeholder='Add a new task...'
        style={inputStyle}
      />
      <button onClick={addTodo} style={buttonStyle}>
        Add Todo
      </button>

      <ul style={{ width: '100%', paddingLeft: '0' }}>
        {todos.map((todo, index) => (
          <li key={index} style={todoItemStyle}>
            <span>{todo}</span>
            {/* Bug 2: Remove button doesn't remove the todo item */}
            <button
              onClick={() => removeTodo(index)}
              style={{
                backgroundColor: '#f44336',
                padding: '5px 10px',
                color: 'white',
                border: 'none',
                borderRadius: '5px',
              }}
            >
              Remove
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default BuggyTodoList;
