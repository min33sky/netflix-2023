import { getServerSession } from 'next-auth';
import { authOptions } from '../auth/[...nextauth]/route';
import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma_db';

export async function GET(request: Request) {
  const session = await getServerSession(authOptions);

  if (!session) {
    return NextResponse.json(
      {
        message: '로그인이 필요한 서비스입니다.',
      },
      {
        status: 401,
      },
    );
  }

  try {
    const moviesCount = await prisma.movie.count();
    const randomIndex = Math.floor(Math.random() * moviesCount);

    const randomMovie = await prisma.movie.findMany({
      skip: randomIndex,
      take: 1,
    });

    return NextResponse.json(randomMovie[0]);
  } catch (error) {
    return NextResponse.json(
      {
        message: '영화를 불러오는 중 오류가 발생했습니다.',
      },
      {
        status: 500,
      },
    );
  }
}
