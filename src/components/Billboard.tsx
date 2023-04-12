'use client';

import useBillboard from '@/hooks/useBillboard';
import React, { useCallback } from 'react';
import { InformationCircleIcon } from '@heroicons/react/24/outline';
import PlayButton from './PlayButton';
import useInfoModalStore from '@/hooks/useInfoModalStore';

export default function Billboard() {
  const { data } = useBillboard();

  const { openModal } = useInfoModalStore();

  const handleModalOpen = useCallback(() => {
    if (data) {
      openModal(data?.id);
    } else {
      alert('영화 정보가 없습니다.');
    }
  }, [data, openModal]);

  return (
    <div className="relative h-[56.25vw]">
      <video
        poster={data?.thumbnailUrl}
        className="h-[56.25vw] w-full object-cover brightness-[60%] transition duration-500"
        autoPlay
        muted
        loop
        src={data?.videoUrl}
      />
      <div className="absolute top-[30%] ml-4 md:top-[40%] md:ml-16">
        <p className="text-1xl h-full w-[50%] font-bold text-white drop-shadow-xl md:text-5xl lg:text-6xl">
          {data?.title}
        </p>
        <p className="mt-3 w-[90%] text-[8px] text-white drop-shadow-xl md:mt-8 md:w-[80%] md:text-lg lg:w-[50%]">
          {data?.description}
        </p>

        <div className="mt-3 flex items-center gap-3 md:mt-4">
          <PlayButton movieId={data?.id || 'movie_id_none'} />
          <button
            onClick={handleModalOpen}
            className="
              flex w-auto items-center
              rounded-md bg-white
              bg-opacity-30 px-2 py-1 text-xs
              font-semibold text-white
              transition
              hover:bg-opacity-20
              md:px-4 md:py-2
              lg:text-lg
        "
          >
            <InformationCircleIcon className="mr-1 w-4 md:w-7" />더 알아보기
          </button>
        </div>
      </div>
    </div>
  );
}
