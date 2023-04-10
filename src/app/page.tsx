import { getServerSession } from 'next-auth';
import { authOptions } from './api/auth/[...nextauth]/route';
import { redirect } from 'next/navigation';
import Navbar from '@/components/Navbar';

export default async function Home() {
  const session = await getServerSession(authOptions);

  console.log(session);

  if (!session) {
    return redirect('/auth');
  }

  console.log('## 현재 접속한 사용자 : ', session.user);

  return (
    <main className="">
      <Navbar />
      {/* <LogoutButton /> */}
      <div className="h-[2000px]">
        <p className="sr-only">스크롤 테스트용 지울꺼임</p>
      </div>
    </main>
  );
}
