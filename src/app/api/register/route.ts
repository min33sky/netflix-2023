import { prisma } from '@/lib/prisma_db';
import { NextResponse } from 'next/server';
import bcrypt from 'bcrypt';

export async function POST(request: Request) {
  try {
    const { username, email, password } = await request.json();

    const existingUser = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (existingUser) {
      return NextResponse.json(
        {
          error: 'User already exists',
        },
        {
          status: 422,
        },
      );
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    const user = await prisma.user.create({
      data: {
        name: username,
        email,
        hashedPassword,
        image: 'https://i.pravatar.cc/150?img=3',
        emailVerified: new Date(),
      },
    });

    return NextResponse.json(user, {
      status: 201,
    });
  } catch (error) {
    return NextResponse.json(
      {
        error: 'Something went wrong',
      },
      {
        status: 500,
      },
    );
  }
}
