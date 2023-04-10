'use client';

import useSWR from 'swr';

export default function useBillboard() {
  const { data, error, isLoading } = useSWR(
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
