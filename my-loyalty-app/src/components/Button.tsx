import React from 'react';

interface ButtonProps {
  text: string;
  onClick?: () => void;
  type?: 'button' | 'submit';
  disabled?: boolean;
}

const Button: React.FC<ButtonProps> = ({ text, onClick, type = 'button', disabled = false }) => (
  <button
    onClick={onClick}
    type={type}
    disabled={disabled}
    className="w-full bg-black text-white py-2 rounded hover:bg-gray-800 transition disabled:opacity-50"
  >
    {text}
  </button>
);

export default Button;