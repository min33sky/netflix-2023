import React from 'react';

interface Props {
  id: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  value: string;
  label: string;
  type?: string;
}

export default function Input({
  id,
  onChange,
  value,
  label,
  type = 'text',
}: Props) {
  return (
    <div className="relative">
      <input
        type={type}
        id={id}
        className="block rounded-md px-6 pt-6 pb-2 w-full text-white bg-neutral-700 peer outline-none appearance-none"
        placeholder=" "
      />
      <label
        htmlFor={id}
        className="absolute text-zinc-400 duration-150 transform -translate-y-3 scale-75 top-4 z-10 origin-[0] left-6
        peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-3"
      >
        {label}
      </label>
    </div>
  );
}
