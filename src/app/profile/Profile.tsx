'use client';

import { useRouter } from 'next/navigation';
import dynamic from 'next/dynamic';
import React, { useCallback } from 'react';
import UserCard from './UserCard';
// const UserCard = dynamic(() => import('./UserCard'), { ssr: false });

interface Props {
  user: {
    name?: string | null | undefined;
    email?: string | null | undefined;
    image?: string | null | undefined;
  };
}

export default function Profile({ user: { name, email, image } }: Props) {
  const router = useRouter();
  // const { data: currentUser } = useCurrentUser(); // TODO: next-auth의 callback 활용

  const selectProfile = useCallback(() => {
    router.push('/');
  }, [router]);

  return (
    <div className="flex h-full items-center justify-center">
      <div className="flex flex-col">
        <h1 className="text-center text-3xl text-white md:text-6xl">
          넷플릭스를 시청할 프로필을 선택하세요.
        </h1>
        <div className="mt-10 flex items-center justify-center gap-8">
          <button onClick={() => selectProfile()}>
            <UserCard name={name} />
          </button>
        </div>
      </div>
    </div>
  );
}
