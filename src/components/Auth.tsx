'use client';

import Input from '@/components/Input';
import Image from 'next/image';
import { FormEvent, useCallback, useState } from 'react';
import { useRouter } from 'next/navigation';
import { signIn } from 'next-auth/react';
import { FcGoogle } from 'react-icons/fc';
import { FaGithub } from 'react-icons/fa';

export default function Auth() {
  const router = useRouter();
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [variant, setVariant] = useState<'login' | 'register'>('login');

  const toggleVariant = useCallback(() => {
    setVariant((currentVariant) =>
      currentVariant === 'login' ? 'register' : 'login',
    );
  }, []);

  /**
   * 로그인 처리
   */
  const login = useCallback(async () => {
    try {
      const response = await signIn('credentials', {
        redirect: false,
        email,
        password,
        callbackUrl: '/',
      });

      if (response?.error) {
        console.log(response.error);
        return;
      }

      // 로그인 성공 시 메인 페이지로 이동
      router.replace('/');
    } catch (error) {}
  }, [email, password, router]);

  /**
   * 회원가입 처리
   */
  const register = useCallback(async () => {
    try {
      await fetch('/api/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username,
          email,
          password,
        }),
      });

      login();
    } catch (error) {
      console.log('회원가입 실패');
    }
  }, [email, login, password, username]);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (variant === 'login') login();
    else register();
  };

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

        <div className="mx-auto flex w-full flex-col justify-center self-center rounded-md bg-black/50 p-16  lg:w-2/5 lg:max-w-md">
          <form onSubmit={handleSubmit} className="mt-2  ">
            <h2 className="mb-8 select-none text-4xl font-semibold text-white">
              {variant === 'login' ? '로그인' : '회원가입'}
            </h2>
            <div className="flex flex-col gap-4">
              {variant === 'register' && (
                <Input
                  id="username"
                  label="이름"
                  onChange={(e) => setUsername(e.target.value)}
                  value={username}
                  type="text"
                />
              )}
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
              type="submit"
              className="mt-10 w-full rounded-md bg-red-600 py-3 text-white transition hover:bg-red-700"
            >
              {variant === 'login' ? '로그인' : '회원가입'}
            </button>
          </form>

          <div className="mt-8 flex items-center justify-center gap-4">
            <button
              onClick={() =>
                signIn('google', {
                  callbackUrl: '/',
                })
              }
              title="Google 로그인"
              className="flex h-10 w-10 items-center justify-center rounded-full bg-white transition hover:opacity-80"
            >
              <FcGoogle size={32} />
            </button>

            <button
              onClick={() =>
                signIn('github', {
                  callbackUrl: '/',
                })
              }
              title="Github 로그인"
              className="flex h-10 w-10 items-center justify-center rounded-full bg-white transition hover:opacity-80"
            >
              <FaGithub size={32} />
            </button>
          </div>

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
    </>
  );
}
