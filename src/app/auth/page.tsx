import Auth from '@/components/Auth';
import { getServerSession } from 'next-auth';
import { authOptions } from '../api/auth/[...nextauth]/route';
import { redirect } from 'next/navigation';

export const metadata = {
  title: '인증 페이지 | Neflix Clone',
};

export default async function AuthPage() {
  const session = await getServerSession(authOptions);

  if (session) {
    return redirect('/profile');
  }

  return (
    <main className="relative h-full w-full bg-[url('/images/hero.jpg')] bg-cover bg-fixed bg-center bg-no-repeat">
      <Auth />
    </main>
  );
}
