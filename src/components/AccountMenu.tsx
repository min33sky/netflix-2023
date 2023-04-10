import { signOut, useSession } from 'next-auth/react';
import Image from 'next/image';
import React from 'react';

interface Props {
  visible: boolean;
}

export default function AccountMenu({ visible }: Props) {
  const { data: session } = useSession();

  if (!visible) return null;

  return (
    <div className="absolute right-0 top-14 flex w-56 flex-col border-2 border-gray-800 bg-black py-5">
      <div className="flex flex-col gap-3">
        <div className="group/item flex w-full flex-row items-center gap-3 px-3">
          <Image
            src="/images/default-blue.png"
            alt="avatar"
            width={32}
            height={32}
            className="rounded-md"
            priority={true}
          />
          <p className="text-sm text-white group-hover/item:underline">
            {session?.user?.name}
          </p>
        </div>
      </div>
      <hr className="my-4 h-px border-0 bg-gray-600" />
      <button
        onClick={() => signOut()}
        className="px-3 text-center text-sm text-white hover:underline"
      >
        넷플릭스에서 로그아웃
      </button>
    </div>
  );
}
