import React, { InputHTMLAttributes } from 'react';

interface FormInputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
}

const FormInput: React.FC<FormInputProps> = ({ label, ...rest }) => (
  <div className="mb-4">
    {label && <label className="block mb-1 text-sm font-medium">{label}</label>}
    <input
      {...rest} // ⚡ esto incluye type, value, onChange, placeholder, required, etc.
      className="w-full border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-black"
    />
  </div>
);

export default FormInput;