import { getServerSession } from 'next-auth';
import { authOptions } from './api/auth/[...nextauth]/route';
import { redirect } from 'next/navigation';
import Navbar from '@/components/Navbar';
import Billboard from '@/components/Billboard';
import MovieList from '@/components/MovieList';
import { Movie } from '@prisma/client';
import { cookies } from 'next/headers';

async function getTrendingMovies() {
  /**
   *? 서버에서 요청을 보낼 때는 쿠키를 같이 보내야 한다. (next-auth 인증에 필요함)
   */
  const nextCookies = cookies();

  // key/value 배열 형태로 되어 있으므로 reduce를 사용해서 문자열로 만든다.
  const cookie = nextCookies.getAll().reduce((acc, cur) => {
    return `${acc}${cur.name}=${cur.value}; `;
  }, '');

  const response = await fetch(`${process.env.BASE_URL}/api/movies`, {
    headers: {
      'Content-Type': 'application/json',
      cookie,
    },
  });

  const data: Movie[] = await response.json();

  return data;
}

export default async function Home() {
  const session = await getServerSession(authOptions);

  if (!session) {
    return redirect('/auth');
  }

  const trendingMovies = await getTrendingMovies();

  return (
    <main className="">
      <Navbar />
      <Billboard />
      <div className="pb-40">
        <MovieList title="지금 유행하는" movies={trendingMovies} />
        <MovieList title="내가 찜한 컨텐츠" />
      </div>
    </main>
  );
}
