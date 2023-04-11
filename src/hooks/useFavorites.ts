'use client';

import { Movie } from '@prisma/client';
import useSWR from 'swr';

export default function useFavorites() {
  const { data, isLoading, error, mutate } = useSWR<Movie[]>(
    '/api/favorites',
    () => fetch('/api/favorites').then((res) => res.json()),
    {
      revalidateIfStale: false,
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
    },
  );

  return {
    data,
    isLoading,
    error,
    mutate,
  };
}
