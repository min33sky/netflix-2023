'use client';

import { User } from '@prisma/client';
import useSWR from 'swr';

export default function useCurrentUser() {
  const { data, error, isLoading, mutate } = useSWR<User>('/api/current', () =>
    fetch('/api/current').then((res) => res.json()),
  );

  return {
    data,
    error,
    isLoading,
    mutate,
  };
}
