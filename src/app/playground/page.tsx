'use client';
import { current } from '@reduxjs/toolkit';
import React, { useState, useEffect } from 'react';

function BuggyCounter() {
  const [count, setCount] = useState(0);
  const [inputValue, setInputValue] = useState(count);

  // Bug 2: This button should update inputValue to an incremented value, but the function is missing.
  const increment = () => {
    setCount(count + 1);
    setInputValue(count + 1); // This should also update the inputValue to reflect the increment.
  };

  // Bug 3: The input value should reflect the current count, but it's not updating when the count changes.
  const handleInputChange = (e: any) => {
    const newValue = parseInt(e.target.value, 10);
    if (!isNaN(newValue)) {
      setCount(newValue);
      setInputValue(newValue);
    }
    setInputValue(e.target.value); // This should be set properly, but it's being overridden elsewhere.
  };

  // Bug 4: Decrement button does not prevent count from going negative.
  const decrement = () => {
    if (count > 0) {
      setCount(count - 1);
      setInputValue(inputValue - 1); // this is already working?
    }
  };

  const containerStyle = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '20px',
    border: '1px solid #ddd',
    borderRadius: '10px',
    maxWidth: '300px',
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
    width: '60px',
  };

  return (
    <div style={containerStyle}>
      <h1>Buggy Counter</h1>
      <h2>{count}</h2>

      {/* Bug 5: The input field should show the count, but it doesn’t */}
      <input
        type='number'
        value={inputValue}
        onChange={handleInputChange}
        style={inputStyle}
      />

      <div>
        <button onClick={increment} style={buttonStyle}>
          Increment
        </button>
        <button onClick={decrement} style={buttonStyle}>
          Decrement
        </button>
      </div>
    </div>
  );
}

export default BuggyCounter;
