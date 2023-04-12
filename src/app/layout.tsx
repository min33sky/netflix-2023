import './globals.css';
import LocalFont from 'next/font/local';
import { authOptions } from './api/auth/[...nextauth]/route';
import SessionWrapper from '@/lib/SessionWrapper';
import { getServerSession } from 'next-auth/next';
import ModalWrapper from '@/lib/ModalWrapper';

export const metadata = {
  title: 'Neflix Clone',
  description: '넷플릭스 클론 프로젝트입니다.',
};

const pretendard = LocalFont({
  variable: '--font-pretendard',
  src: [
    {
      path: '../../public/fonts/Pretendard-Light.woff2',
      weight: '300',
    },
    {
      path: '../../public/fonts/Pretendard-Regular.woff2',
      weight: '400',
    },
    {
      path: '../../public/fonts/Pretendard-Bold.woff2',
      weight: '700',
    },
  ],
});

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);

  return (
    <html lang="ko">
      <body
        className={`h-full overflow-x-hidden bg-zinc-900 font-pretendard ${pretendard.variable}`}
      >
        <SessionWrapper session={session}>
          <ModalWrapper>{children}</ModalWrapper>
        </SessionWrapper>
      </body>
    </html>
  );
}
