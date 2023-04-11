import { getServerSession } from 'next-auth';
import { authOptions } from '../auth/[...nextauth]/route';
import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma_db';

export async function POST(request: Request) {
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
    const { movieId } = await request.json();

    const existingMovie = await prisma.movie.findUnique({
      where: {
        id: movieId,
      },
    });

    if (!existingMovie) {
      return NextResponse.json(
        {
          message: '존재하지 않는 영화입니다.',
        },
        {
          status: 404,
        },
      );
    }

    const updatedUser = await prisma.user.update({
      where: {
        id: session.user.id,
      },
      data: {
        favoriteIds: {
          push: movieId,
        },
      },
    });

    return NextResponse.json(updatedUser);
  } catch (error) {
    return NextResponse.json(
      {
        message: '좋아요 작업 중 오류가 발생했습니다.',
      },
      {
        status: 500,
      },
    );
  }
}

export async function DELETE(request: Request) {
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
    const { movieId } = await request.json();

    const existingMovie = await prisma.movie.findUnique({
      where: {
        id: movieId,
      },
    });

    if (!existingMovie) {
      return NextResponse.json(
        {
          message: '존재하지 않는 영화입니다.',
        },
        {
          status: 404,
        },
      );
    }

    const currentUser = await prisma.user.findUnique({
      where: {
        id: session.user.id,
      },
    });

    const updatedFavoriteIds = currentUser?.favoriteIds.filter(
      (id) => id !== movieId,
    );

    const updatedUser = await prisma.user.update({
      where: {
        id: session.user.id,
      },
      data: {
        favoriteIds: updatedFavoriteIds,
      },
    });

    return NextResponse.json(updatedUser);
  } catch (error) {
    return NextResponse.json(
      {
        message: '좋아요 취소 작업 중 오류가 발생했습니다.',
      },
      {
        status: 500,
      },
    );
  }
}
