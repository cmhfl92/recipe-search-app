'use client';
import { useState } from 'react';

interface ButtonProps {
  label: string;
  onClick: () => void;
  variant?: 'primary' | 'secondary';
}

const Button = ({ label, onClick, variant = 'primary' }: ButtonProps) => {
  return (
    <>
      <div
        className={`text-white px-4 py-2 rounded  ${
          variant === 'primary' ? 'bg-green-600' : 'bg-red-400'
        }`}
      >
        <button onClick={onClick}>{label}</button>
      </div>
    </>
  );
};

export default Button;
