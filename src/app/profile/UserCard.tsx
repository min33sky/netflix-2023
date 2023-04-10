import Image from 'next/image';
import React from 'react';

const images = [
  '/images/default-blue.png',
  '/images/default-red.png',
  '/images/default-slate.png',
  '/images/default-green.png',
];

interface Props {
  name?: string | null | undefined;
}

export default function UserCard({ name }: Props) {
  //? 랜덤으로 색상 호출 시 경고 발생한다. (클라이언트와 서버의 랜덤값이 다름)
  //? 그래서 색상을 지정하는 방식으로 변경 (dynamic import를 사용해도 되는데 깜박임 거슬림)
  const imgSrc = images[(name || '사용자').length % images.length];

  return (
    <article className="group mx-auto flex w-44 flex-col">
      <div className="relative h-44 w-44 overflow-hidden rounded-md border-2 border-transparent group-hover:border-white ">
        <Image
          fill
          src={imgSrc}
          alt="profile button"
          sizes="(max-width: 768px) 100vw,
              (max-width: 1200px) 50vw,
              33vw"
          priority={true}
        />
      </div>
      <p className="mt-4 text-center text-xl text-gray-400 group-hover:text-white">
        {name || '사용자'}
      </p>
    </article>
  );
}
