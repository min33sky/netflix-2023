'use client';

import { Movie } from '@prisma/client';
import React from 'react';
import MovieCard from './MovieCard';
import useFavorites from '@/hooks/useFavorites';

interface Props {
  title: '내가 찜한 컨텐츠' | '지금 유행하는';
  movies?: Movie[];
}

export default function MovieList({ title, movies }: Props) {
  const { data: favoriteMovies } = useFavorites();

  return (
    <article className="mt-4 space-y-8 px-4 md:px-12">
      <div>
        <p className="mb-4 text-base font-semibold text-white md:text-xl lg:text-2xl">
          {title}
        </p>
        <div className="grid grid-cols-4 gap-2">
          {title === '내가 찜한 컨텐츠'
            ? favoriteMovies?.map((movie) => (
                <MovieCard key={movie.id} movie={movie} />
              ))
            : movies?.map((movie) => (
                <MovieCard key={movie.id} movie={movie} />
              ))}
          {}
        </div>
      </div>
    </article>
  );
}
