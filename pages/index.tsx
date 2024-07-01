import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function Home() {
  return (
    <div
      className="flex h-screen flex-row items-center justify-center gap-5 bg-gradient-to-b from-blue-700 to-sky-700"
    >
      <Button variant="link">
        <Link className="text-white" href="/auth/login">Login</Link>
      </Button>
      <Button variant="link">
        <Link href="/auth/register">Register</Link>
      </Button>
    </div>
  );
}
