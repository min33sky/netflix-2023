import React from 'react';

interface Props {
  label: string;
  active?: boolean;
}

export default function NavbarItem({ label, active }: Props) {
  return (
    <div
      className={
        active
          ? 'cursor-default text-white'
          : 'cursor-pointer text-gray-200 transition hover:text-gray-300'
      }
    >
      {label}
    </div>
  );
}
