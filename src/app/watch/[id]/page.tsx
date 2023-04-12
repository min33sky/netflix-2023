import { cookies } from 'next/headers';
import WatchMovie from './WatchMovie';
import { Movie } from '@prisma/client';

interface Props {
  params: {
    id: string;
  };
}

async function getMovieDetail(id: string) {
  /**
   *? 서버에서 요청을 보낼 때는 쿠키를 같이 보내야 한다. (next-auth 인증에 필요함)
   */
  const nextCookies = cookies();

  // key/value 배열 형태로 되어 있으므로 reduce를 사용해서 문자열로 만든다.
  const cookie = nextCookies.getAll().reduce((acc, cur) => {
    return `${acc}${cur.name}=${cur.value}; `;
  }, '');

  const response = await fetch(`${process.env.BASE_URL}/api/movies/${id}`, {
    headers: {
      'Content-Type': 'application/json',
      cookie,
    },
  });
  const data: Movie = await response.json();
  return data;
}

export default async function MovieDetailPage({ params: { id } }: Props) {
  const movie = await getMovieDetail(id);

  return <WatchMovie id={id} movie={movie} />;
}
