'use client';
import { useState } from 'react';

interface ButtonProps {
  label: string;
  onClick: () => void;
  variant?: 'primary' | 'secondary';
  className?: string;
}

const Button = ({
  label,
  onClick,
  variant = 'primary',
  className,
}: ButtonProps) => {
  return (
    <>
      <div
        className={`text-white px-4 py-2 rounded   ${
          variant === 'primary'
            ? 'bg-green-600 hover:bg-green-800'
            : 'bg-red-500 hover:bg-red-700'
        }`}
      >
        <button onClick={onClick} className=''>
          {label}
        </button>
      </div>
    </>
  );
};

export default Button;
