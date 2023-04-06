import Input from '@/components/Input';
import Image from 'next/image';
import React from 'react';

export const metadata = {
  title: '인증 페이지 | Neflix Clone',
};

export default function page() {
  return (
    <div className="relative h-full w-full bg-[url('/images/hero.jpg')] bg-no-repeat bg-center bg-fixed bg-cover">
      <div className="bg-black h-full w-full lg:bg-opacity-50">
        <nav className="px-12 py-5">
          <Image
            src="/images/logo.png"
            width={150}
            height={100}
            alt="Netflix Logo"
          />
        </nav>

        <div className="flex justify-center">
          <div className="bg-black/70 p-16 self-center mt-2 lg:w-2/5 lg:max-w-md rounded-md w-full ">
            <h2 className="text-white text-4xl mb-8 font-semibold">로그인</h2>
            <div className="flex flex-col gap-4">
              <Input
                id="email"
                label="이메일"
                onChange={() => {}}
                value="임시"
                type="email"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
