'use client';

import React, { useCallback, useMemo } from 'react';
import { PlusIcon, CheckIcon } from '@heroicons/react/24/outline';
import useFavorites from '@/hooks/useFavorites';
import useCurrentUser from '@/hooks/useCurrentUser';
import { User } from '@prisma/client';

interface Props {
  movieId: string;
}

export default function FavoriteButton({ movieId }: Props) {
  const { mutate: mutateFavorites } = useFavorites();
  const { data: currentUser, mutate: mutateCurrentUser } = useCurrentUser();

  console.log('## currentUser: ', currentUser);

  const isFavorite = useMemo(() => {
    const list = currentUser?.favoriteIds || [];
    return list.includes(movieId);
  }, [currentUser?.favoriteIds, movieId]);

  const toggleFavorites = useCallback(async () => {
    let response;

    if (isFavorite) {
      // 좋아요 취소
      response = await fetch('/api/favorite', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          movieId,
        }),
      });
    } else {
      // 좋아요
      response = await fetch('/api/favorite', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          movieId,
        }),
      });
    }

    const result = await response.json();

    const updatedUser = {
      ...currentUser,
      favoriteIds: result.favoriteIds,
    } as User;

    mutateCurrentUser(updatedUser);
    mutateFavorites(); // 즐겨찾기 목록을 다시 가져오기 위해
  }, [currentUser, isFavorite, movieId, mutateCurrentUser, mutateFavorites]);

  const Icon = isFavorite ? CheckIcon : PlusIcon;

  return (
    <div
      onClick={toggleFavorites}
      className="group/item flex h-6 w-6 cursor-pointer items-center justify-center rounded-full border-2 border-white transition hover:border-neutral-300 lg:h-10 lg:w-10"
    >
      <Icon className="w-4 text-white group-hover/item:text-neutral-300 lg:w-6" />
    </div>
  );
}
