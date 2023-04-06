import Auth from '@/components/Auth';

export const metadata = {
  title: '인증 페이지 | Neflix Clone',
};

export default function AuthPage() {
  return (
    <main className="relative h-full w-full bg-[url('/images/hero.jpg')] bg-no-repeat bg-center bg-fixed bg-cover">
      <Auth />
    </main>
  );
}
