import { getServerSession } from 'next-auth';
import { NextResponse } from 'next/server';
import { authOptions } from '../../auth/[...nextauth]/route';
import { prisma } from '@/lib/prisma_db';

export async function GET(
  request: Request,
  {
    params: { movieId },
  }: {
    params: { movieId: string };
  },
) {
  const session = await getServerSession(authOptions);

  if (!session) {
    return NextResponse.json({ error: 'Not authenticated' }, { status: 401 });
  }

  try {
    const movie = await prisma.movie.findUnique({
      where: {
        id: movieId,
      },
    });

    if (!movie) {
      return NextResponse.json({ error: 'Movie not found' }, { status: 404 });
    }

    return NextResponse.json(movie);
  } catch (error) {
    return NextResponse.json(
      { error: 'Error fetching movie' },
      { status: 500 },
    );
  }
}
