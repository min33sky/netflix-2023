'use client';

import Input from '@/components/Input';
import Image from 'next/image';
import { useCallback, useState } from 'react';

export default function Auth() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [variant, setVariant] = useState<'login' | 'register'>('login');

  const toggleVariant = useCallback(() => {
    setVariant((currentVariant) =>
      currentVariant === 'login' ? 'register' : 'login',
    );
  }, []);

  return (
    <>
      <div className="h-full w-full bg-black lg:bg-opacity-50">
        <nav className="px-12 py-5">
          <Image
            src="/images/logo.png"
            width={150}
            height={100}
            alt="Netflix Logo"
            priority={true}
          />
        </nav>

        <div className="flex justify-center">
          <div className="mt-2 w-full self-center rounded-md bg-black/70 p-16 lg:w-2/5 lg:max-w-md ">
            <h2 className="mb-8 select-none text-4xl font-semibold text-white">
              {variant === 'login' ? '로그인' : '회원가입'}
            </h2>
            <div className="flex flex-col gap-4">
              <Input
                id="username"
                label="이름"
                onChange={(e) => setUsername(e.target.value)}
                value={username}
                type="text"
              />
              <Input
                id="email"
                label="이메일"
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                type="email"
              />
              <Input
                id="password"
                label="비밀번호"
                onChange={(e) => setPassword(e.target.value)}
                value={password}
                type="password"
              />
            </div>

            <button
              onClick={
                variant === 'login'
                  ? () => alert('로그인')
                  : () => alert('회원가입')
              }
              className="mt-10 w-full rounded-md bg-red-600 py-3 text-white transition hover:bg-red-700"
            >
              {variant === 'login' ? '로그인' : '회원가입'}
            </button>

            <div>{/* TODO: OAUTH */}</div>

            <p className="mt-12 text-neutral-500">
              {variant === 'login'
                ? '처음 방문하셨나요?'
                : '이미 계정이 있으신가요?'}
              <span
                onClick={toggleVariant}
                className="ml-2 cursor-pointer text-white hover:underline"
              >
                {variant === 'login' ? '새 계정 만들기' : '로그인하기'}
              </span>
              .
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
