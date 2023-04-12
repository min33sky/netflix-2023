import useSWR from 'swr';

export default function useMovie(movieId: string) {
  const { data, isLoading, error } = useSWR(
    `/api/movies/${movieId}`,
    () =>
      movieId
        ? fetch(`/api/movies/${movieId}`).then((res) => res.json())
        : null,
    {
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
      revalidateIfStale: false,
    },
  );

  return {
    data,
    isLoading,
    error,
  };
}
