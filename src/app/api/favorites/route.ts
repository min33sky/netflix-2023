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
    const currentUser = await prisma.user.findUnique({
      where: {
        id: session.user.id,
      },
    });

    const favoritedMovies = await prisma.movie.findMany({
      where: {
        id: {
          in: currentUser?.favoriteIds,
        },
      },
    });

    return NextResponse.json(favoritedMovies);
  } catch (error) {
    return NextResponse.json(
      {
        message: '좋아요 누른 영화를 불러오는 중 오류가 발생했습니다.',
      },
      {
        status: 500,
      },
    );
  }
}
