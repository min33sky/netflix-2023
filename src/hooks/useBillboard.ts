'use client';

import { Movie } from '@prisma/client';
import useSWR from 'swr';

export default function useBillboard() {
  const { data, error, isLoading } = useSWR<Movie>(
    '/api/random',
    () => fetch('/api/random').then((res) => res.json()),
    {
      revalidateIfStale: false,
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
    },
  );

  return {
    data,
    error,
    isLoading,
  };
}
