import { getServerSession } from 'next-auth';
import { authOptions } from './api/auth/[...nextauth]/route';
import { redirect } from 'next/navigation';
import LogoutButton from '@/components/LogoutButton';

export default async function Home() {
  const session = await getServerSession(authOptions);

  console.log(session);

  if (!session) {
    return redirect('/auth');
  }

  console.log('## 현재 접속한 사용자 : ', session.user);

  return (
    <main>
      <h1 className="text-green-500">Hello ~~~</h1>
      <LogoutButton />
    </main>
  );
}
