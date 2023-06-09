import { getServerSession } from 'next-auth';
import Profile from './Profile';
import { authOptions } from '../api/auth/[...nextauth]/route';
import { redirect } from 'next/navigation';

export default async function ProfilePage() {
  const session = await getServerSession(authOptions);

  if (!session?.user) {
    return redirect('/auth');
  }

  return <Profile user={session?.user} />;
}
