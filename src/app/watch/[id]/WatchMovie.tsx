'use client';

import { ArrowLeftIcon } from '@heroicons/react/24/outline';
import { Movie } from '@prisma/client';
import { useRouter } from 'next/navigation';
import React from 'react';

interface Props {
  id: string;
  movie: Movie;
}

export default function WatchMovie({ id, movie }: Props) {
  const router = useRouter();

  return (
    <div className="h-screen w-screen bg-black">
      <nav className="fixed z-10 flex w-full flex-row items-center gap-8 bg-black bg-opacity-70 p-4">
        <ArrowLeftIcon
          onClick={() => router.back()}
          className="w-4 cursor-pointer text-white transition hover:opacity-80 md:w-10"
        />
        <p className="text-1xl font-bold text-white md:text-3xl">
          <span className="font-light">재생중 :</span> {movie.title}
        </p>
      </nav>
      <video
        className="h-full w-full"
        autoPlay
        controls
        src={movie.videoUrl}
      ></video>
    </div>
  );
}
