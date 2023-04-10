'use client';

import { useRouter } from 'next/navigation';
import React from 'react';
import { PlayIcon } from '@heroicons/react/24/solid';

interface Props {
  movieId: string;
}

export default function PlayButton({ movieId }: Props) {
  const router = useRouter();

  return (
    <button
      onClick={() => router.push(`/watch/${movieId}`)}
      className="
        flex w-auto items-center
        rounded-md bg-white
        px-2 py-1 text-xs
        font-semibold
        transition
        hover:bg-neutral-300
        md:px-4
        md:py-2
        lg:text-lg
        "
    >
      <PlayIcon className="mr-1 w-4 text-black md:w-7" />
      재생
    </button>
  );
}
