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
            ? 'bg-[#1e8ea6] hover:opacity-90'
            : 'bg-[#db4b24] hover:opacity-90'
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
