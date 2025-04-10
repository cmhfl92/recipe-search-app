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
      <div className={variant === 'primary' ? 'bg-red-400' : 'bg-green-400'}>
        <button onClick={onClick}>{label}</button>
      </div>
    </>
  );
};

export default Button;
