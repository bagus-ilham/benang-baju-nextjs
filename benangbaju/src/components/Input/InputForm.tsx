"use client"

import React, { FC } from "react";

type Props = {
    label?: string;
    type?: string;
    id?: string;
    placeholder?: string;
    required?: boolean;
    value?: string;
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}
const InputForm: FC<Props> = ({
    label,
    type,
    id,
    placeholder,
    required = false,
    value,
    onChange
}) => {
    // console.log(onChange, "<<<<<<<");
    
  return (
    <>
      <div className="mb-4">
        <label htmlFor={id} className="block mb-2 text-sm font-medium">
          {label}
        </label>
        <input
          type={type}
          id={id}
          name={id}
          className="bg-gray-100 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 w-full py-2.5 px-4"
          placeholder={placeholder}
          required={required}
          value={value}
          onChange={onChange}
        />
      </div>
    </>
  );
};

export default InputForm;
