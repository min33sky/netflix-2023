import NextAuth, { type NextAuthOptions } from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import Credentials from 'next-auth/providers/credentials';
import GithubProvider from 'next-auth/providers/github';
import { prisma } from '@/lib/prisma_db';
import { compare } from 'bcrypt';

export const authOptions: NextAuthOptions = {
  providers: [
    // GithubProvider({
    //   clientId: process.env.GITHUB_ID || '',
    //   clientSecret: process.env.GITHUB_SECRET || '',
    // }),
    // GoogleProvider({
    //   clientId: process.env.GOOGLE_OAUTH_ID || '',
    //   clientSecret: process.env.GOOGLE_OAUTH_SECRET || '',
    // }),

    Credentials({
      id: 'credentials',
      name: 'Credentials',
      credentials: {
        email: {
          label: 'Email',
          type: 'text',
        },
        password: {
          label: 'Password',
          type: 'passord',
        },
      },

      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error('Email and password required');
        }

        // 존재하는 유저인지 확인
        const user = await prisma.user.findUnique({
          where: {
            email: credentials.email,
          },
        });

        if (!user || !user.hashedPassword) {
          throw new Error('Email does not exist');
        }

        // 비밀번호 비교
        const isCorrectPassword = await compare(
          credentials.password,
          user.hashedPassword,
        );

        if (!isCorrectPassword) {
          throw new Error('Incorrect password');
        }

        return user;
      },
    }),
  ],
  pages: {
    signIn: '/auth',
  },
  debug: process.env.NODE_ENV === 'development',
  session: {
    strategy: 'jwt',
  },
  // secret: process.env.NEXTAUTH_SECRET, //? 환경변수에 NEXTAUTH_SECRET만 설정해주면 자동으로 됨
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
