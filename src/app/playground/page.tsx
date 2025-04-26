'use client';
import React, { useState } from 'react';

const Playground = () => {
  const [count, setCount] = useState(0);
  const [inputValue, setInputValue] = useState('');

  const handleClick = () => {
    setCount(count + 1);
  };

  const handleChange = (event: any) => {
    setInputValue(event.target.value);
  };

  const handleReset = () => {
    setCount(0);
    setInputValue('');
  };

  return (
    <div>
      <h2>Playground Component</h2>
      <p>Count: {count}</p>
      <button onClick={handleClick}>Increment Count</button>
      <br />
      <input type='text' value={inputValue} onChange={handleChange} />
      <br />
      <button onClick={handleReset}>Reset</button>
      <p>Entered Value: {inputValue}</p>
    </div>
  );
};

export default Playground;
